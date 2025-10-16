package main

import (
	"crypto/md5"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/exec"
	"path/filepath"
	"strings"
	"time"
)

type Event struct {
	Name              string `json:"name"`
	Slug              string `json:"slug"`
	StripeCheckoutUrl string `json:"stripeCheckoutUrl,omitempty"`
}

type EventConfig struct {
	StripeCheckoutUrl string `json:"stripeCheckoutUrl"`
}

type Photo struct {
	Name        string   `json:"name"`
	URL         string   `json:"url"`
	Numbers     []string `json:"numbers,omitempty"`
	Description string   `json:"description,omitempty"`
}

const eventsDir = "./events"
const eventsConfigFile = "./events-config.json"
const cacheDir = "./cache"

var eventsConfig map[string]EventConfig

type PhotoCache struct {
	Photos    []Photo   `json:"photos"`
	UpdatedAt time.Time `json:"updated_at"`
	Hash      string    `json:"hash"` // Hash des fichiers pour détecter les changements
}

// enableCORS adds CORS headers to the response
func enableCORS(w http.ResponseWriter, r *http.Request) {
	origin := r.Header.Get("Origin")
	
	// Liste des domaines autorisés
	allowedOrigins := []string{
		"https://simonbourlier.fr",
		"https://www.simonbourlier.fr",
		"https://photos.simonbourlier.fr",
		"http://localhost:3000", // Pour le développement local
	}
	
	// Vérifier si l'origine est dans la liste des domaines autorisés
	isAllowed := false
	for _, allowedOrigin := range allowedOrigins {
		if origin == allowedOrigin {
			isAllowed = true
			break
		}
	}
	
	// Accepter aussi les domaines Vercel (.vercel.app) qui se terminent par simonbourlier
	if !isAllowed && strings.HasSuffix(origin, ".vercel.app") && strings.Contains(origin, "simonbourlier") {
		isAllowed = true
	}
	
	if isAllowed {
		w.Header().Set("Access-Control-Allow-Origin", origin)
	}
	
	w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	
	// Handle preflight requests
	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}
}

// loadEventsConfig loads the events configuration from JSON file
func loadEventsConfig() error {
	data, err := os.ReadFile(eventsConfigFile)
	if err != nil {
		// Si le fichier n'existe pas, on continue sans erreur
		if os.IsNotExist(err) {
			eventsConfig = make(map[string]EventConfig)
			return nil
		}
		return err
	}

	eventsConfig = make(map[string]EventConfig)
	if err := json.Unmarshal(data, &eventsConfig); err != nil {
		return err
	}

	return nil
}

// isProduction checks if the app is running in production
func isProduction() bool {
	env := os.Getenv("ENV")
	return env == "production" || env == "prod"
}

// corsMiddleware handles CORS headers
func corsMiddleware(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		origin := r.Header.Get("Origin")
		
		// Liste des domaines autorisés
		allowedOrigins := []string{
			"https://simonbourlier.fr",
			"https://www.simonbourlier.fr",
			"https://photos.simonbourlier.fr",
		}
		
		// En développement, ajouter localhost
		if !isProduction() {
			allowedOrigins = append(allowedOrigins, "http://localhost:3000")
		}
		
		// Vérifier si l'origine est dans la liste des domaines autorisés
		isAllowed := false
		for _, allowedOrigin := range allowedOrigins {
			if origin == allowedOrigin {
				isAllowed = true
				break
			}
		}
		
		// Accepter aussi les domaines Vercel (.vercel.app) qui se terminent par simonbourlier
		if !isAllowed && strings.HasSuffix(origin, ".vercel.app") && strings.Contains(origin, "simonbourlier") {
			isAllowed = true
		}
		
		if isAllowed {
			w.Header().Set("Access-Control-Allow-Origin", origin)
		}
		
		w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

		// Handle preflight requests
		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		next(w, r)
	}
}

// getEvents returns all event directories
func getEvents(w http.ResponseWriter, r *http.Request) {
	enableCORS(w, r)
	if r.Method == "OPTIONS" {
		return
	}

	var events []Event

	entries, err := os.ReadDir(eventsDir)
	if err != nil {
		http.Error(w, "Error reading events directory", http.StatusInternalServerError)
		log.Printf("Error reading events directory: %v", err)
		return
	}

	for _, entry := range entries {
		if entry.IsDir() {
			event := Event{
				Name: formatEventName(entry.Name()),
				Slug: entry.Name(),
			}
			
			// Ajouter la configuration Stripe si disponible
			if config, exists := eventsConfig[entry.Name()]; exists {
				event.StripeCheckoutUrl = config.StripeCheckoutUrl
			}
			
			events = append(events, event)
		}
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(events)
}

// getEventPhotos returns all photos for a specific event
func getEventPhotos(w http.ResponseWriter, r *http.Request) {
	enableCORS(w, r)
	if r.Method == "OPTIONS" {
		return
	}

	// Extract event slug from URL path
	path := strings.TrimPrefix(r.URL.Path, "/events/")
	path = strings.TrimSuffix(path, "/photos")
	eventSlug := strings.Trim(path, "/")

	if eventSlug == "" {
		http.Error(w, "Event slug is required", http.StatusBadRequest)
		return
	}

	eventPath := filepath.Join(eventsDir, eventSlug)

	// Check if event directory exists
	if _, err := os.Stat(eventPath); os.IsNotExist(err) {
		http.Error(w, "Event not found", http.StatusNotFound)
		return
	}

	// Try to load from cache first
	photos, err := loadPhotosFromCache(eventSlug, eventPath)
	if err != nil {
		// Cache miss or error, generate photos and save to cache
		log.Printf("Cache miss for event %s, generating photos list...", eventSlug)
		photos, err = getPhotosFromDirectory(eventPath, eventSlug)
		if err != nil {
			http.Error(w, "Error reading photos", http.StatusInternalServerError)
			log.Printf("Error reading photos for event %s: %v", eventSlug, err)
			return
		}
		
		// Save to cache
		if err := savePhotosToCache(eventSlug, eventPath, photos); err != nil {
			log.Printf("Warning: Failed to save cache for event %s: %v", eventSlug, err)
		}
	} else {
		log.Printf("Cache hit for event %s, %d photos loaded from cache", eventSlug, len(photos))
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(photos)
}

// extractNumbersFromEXIF extracts numbers from EXIF Keywords or Subject tags using exiftool
func extractNumbersFromEXIF(imagePath string) []string {
	var numbers []string

	// Utiliser exiftool pour lire les Keywords et Subject
	cmd := exec.Command("exiftool", "-Keywords", "-Subject", "-s", "-s", "-s", imagePath)
	output, err := cmd.Output()
	if err != nil {
		// Pas de données EXIF ou exiftool non disponible
		return numbers
	}

	// Parser la sortie
	lines := strings.Split(string(output), "\n")
	numbersSet := make(map[string]bool)
	
	for _, line := range lines {
		line = strings.TrimSpace(line)
		if line == "" {
			continue
		}
		
		// Les keywords/subjects sont séparés par des virgules
		parts := strings.Split(line, ",")
		for _, part := range parts {
			part = strings.TrimSpace(part)
			part = strings.ReplaceAll(part, "#", "")
			if part != "" {
				numbersSet[part] = true
			}
		}
	}
	
	// Convertir le set en slice
	for num := range numbersSet {
		numbers = append(numbers, num)
	}
	
	log.Printf("Photo %s - Numéros trouvés: %v", filepath.Base(imagePath), numbers)
	
	return numbers
}

// getCacheFilePath returns the path to the cache file for an event
func getCacheFilePath(eventSlug string) string {
	return filepath.Join(cacheDir, fmt.Sprintf("%s.json", eventSlug))
}

// getDirectoryHash calculates a hash of the directory contents (file names and modification times)
func getDirectoryHash(dirPath string) (string, error) {
	h := md5.New()
	
	err := filepath.Walk(dirPath, func(path string, info os.FileInfo, err error) error {
		if err != nil {
			return err
		}
		if !info.IsDir() {
			// Include file name and modification time in hash
			fmt.Fprintf(h, "%s:%d:", path, info.ModTime().Unix())
		}
		return nil
	})
	
	if err != nil {
		return "", err
	}
	
	return fmt.Sprintf("%x", h.Sum(nil)), nil
}

// loadPhotosFromCache loads photos from cache if available and valid
func loadPhotosFromCache(eventSlug, eventPath string) ([]Photo, error) {
	cacheFile := getCacheFilePath(eventSlug)
	
	// Check if cache file exists
	if _, err := os.Stat(cacheFile); os.IsNotExist(err) {
		return nil, fmt.Errorf("cache file does not exist")
	}
	
	// Read cache file
	data, err := os.ReadFile(cacheFile)
	if err != nil {
		return nil, err
	}
	
	var cache PhotoCache
	if err := json.Unmarshal(data, &cache); err != nil {
		return nil, err
	}
	
	// Check if directory has changed by comparing hash
	currentHash, err := getDirectoryHash(eventPath)
	if err != nil {
		return nil, err
	}
	
	if cache.Hash != currentHash {
		return nil, fmt.Errorf("cache is outdated (directory changed)")
	}
	
	return cache.Photos, nil
}

// savePhotosToCache saves photos to cache
func savePhotosToCache(eventSlug, eventPath string, photos []Photo) error {
	// Create cache directory if it doesn't exist
	if err := os.MkdirAll(cacheDir, 0755); err != nil {
		return err
	}
	
	// Calculate directory hash
	hash, err := getDirectoryHash(eventPath)
	if err != nil {
		return err
	}
	
	cache := PhotoCache{
		Photos:    photos,
		UpdatedAt: time.Now(),
		Hash:      hash,
	}
	
	data, err := json.MarshalIndent(cache, "", "  ")
	if err != nil {
		return err
	}
	
	cacheFile := getCacheFilePath(eventSlug)
	return os.WriteFile(cacheFile, data, 0644)
}

// getPhotosFromDirectory recursively gets all image files from a directory
func getPhotosFromDirectory(dirPath, eventSlug string) ([]Photo, error) {
	var photos []Photo
	imageExtensions := map[string]bool{
		".jpg":  true,
		".jpeg": true,
		".png":  true,
		".gif":  true,
		".webp": true,
	}

	err := filepath.Walk(dirPath, func(path string, info os.FileInfo, err error) error {
		if err != nil {
			return err
		}

		if !info.IsDir() {
			ext := strings.ToLower(filepath.Ext(path))
			if imageExtensions[ext] {
				// Get relative path from events directory
				relPath, err := filepath.Rel(eventsDir, path)
				if err != nil {
					return err
				}

				// Extract numbers from EXIF
				numbers := extractNumbersFromEXIF(path)
				
				// Log pour le debug (à retirer en production)
				if len(numbers) > 0 {
					log.Printf("Photo %s: found numbers %v", info.Name(), numbers)
				}

				photos = append(photos, Photo{
					Name:    info.Name(),
					URL:     fmt.Sprintf("/events/%s", relPath),
					Numbers: numbers,
				})
			}
		}

		return nil
	})

	return photos, err
}

// serveEventImage serves an image file from the events directory
func serveEventImage(w http.ResponseWriter, r *http.Request) {
	enableCORS(w, r)
	if r.Method == "OPTIONS" {
		return
	}

	// Extract path after /events/
	imagePath := strings.TrimPrefix(r.URL.Path, "/events/")
	
	if imagePath == "" || imagePath == "/" {
		http.Error(w, "Image path is required", http.StatusBadRequest)
		return
	}

	// Security check: prevent directory traversal
	if strings.Contains(imagePath, "..") {
		http.Error(w, "Invalid path", http.StatusBadRequest)
		return
	}

	fullPath := filepath.Join(eventsDir, imagePath)

	// Check if file exists and is not a directory
	info, err := os.Stat(fullPath)
	if os.IsNotExist(err) {
		http.Error(w, "Image not found", http.StatusNotFound)
		return
	}
	if info.IsDir() {
		http.Error(w, "Invalid path", http.StatusBadRequest)
		return
	}

	// Serve the file
	http.ServeFile(w, r, fullPath)
}

// formatEventName converts a slug to a readable name
func formatEventName(slug string) string {
	// Replace hyphens with spaces and capitalize words
	words := strings.Split(slug, "-")
	for i, word := range words {
		if len(word) > 0 {
			words[i] = strings.ToUpper(word[:1]) + word[1:]
		}
	}
	return strings.Join(words, " ")
}

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	// Charger la configuration des événements
	if err := loadEventsConfig(); err != nil {
		log.Printf("Warning: Could not load events config: %v", err)
	}

	// Routes
	http.HandleFunc("/events/", corsMiddleware(func(w http.ResponseWriter, r *http.Request) {
		if r.URL.Path == "/events" || r.URL.Path == "/events/" {
			getEvents(w, r)
		} else if strings.HasSuffix(r.URL.Path, "/photos") {
			getEventPhotos(w, r)
		} else {
			// Serve image files
			serveEventImage(w, r)
		}
	}))

	// Health check endpoint
	http.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("OK"))
	})

	log.Printf("Starting server on port %s (Environment: %s)", port, func() string {
		if isProduction() {
			return "production"
		}
		return "development"
	}())
	
	if err := http.ListenAndServe(":"+port, nil); err != nil {
		log.Fatal(err)
	}
}
