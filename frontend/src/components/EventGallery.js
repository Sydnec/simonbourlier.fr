import { useEffect, useState, useCallback } from "react";
import styles from "../styles/EventGallery.module.css";
import Image from "next/image";
import { FaSearch, FaTimes, FaShoppingCart } from "react-icons/fa";

const EventGallery = ({ eventSlug, stripeCheckoutUrl }) => {
  const [photos, setPhotos] = useState([]);
  const [filteredPhotos, setFilteredPhotos] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [searchNumber, setSearchNumber] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [allNumbers, setAllNumbers] = useState([]);
  const [showFilter, setShowFilter] = useState(false);

  const extractText = (value) => {
    if (!value) return "";
    if (typeof value === "string") return value;
    if (value._content) return value._content;
    return "";
  };

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
        const response = await fetch(`${apiUrl}/events/${eventSlug}/photos`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch photos');
        }
        
        const data = await response.json();
        
        // Transformer les données de l'API Go pour correspondre au format attendu
        const transformedPhotos = data.map((photo, index) => {
          const photoUrl = `${apiUrl}${photo.url}`;
          
          return {
            id: `${eventSlug}-${index}`,
            name: photo.name,
            title: photo.name,
            url: photoUrl,
            // Créer un objet sizes compatible avec l'affichage existant
            sizes: [
              {
                label: 'Large',
                source: photoUrl,
              },
              {
                label: 'Large 1600',
                source: photoUrl,
              }
            ],
            // Récupérer les numéros depuis l'API
            numbers: photo.numbers || [],
            price: 5.0,
          };
        });
        
        setPhotos(transformedPhotos);
        setFilteredPhotos(transformedPhotos);

        const numbers = new Set();
        transformedPhotos.forEach((photo) => {
          photo.numbers?.forEach((n) => numbers.add(n));
        });
        setAllNumbers(Array.from(numbers).sort((a, b) => a - b));

        setIsLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des photos:", error);
        setIsLoading(false);
      }
    };

    if (eventSlug) {
      fetchPhotos();
    }
  }, [eventSlug]);

  useEffect(() => {
    if (searchNumber.trim() === "") {
      setFilteredPhotos(photos);
    } else {
      const photosWithNumber = photos.filter((photo) =>
        photo.numbers?.some((number) => number === searchNumber.trim())
      );

      const photosWithoutNumber = photos.filter(
        (photo) => !photo.numbers || photo.numbers.length === 0
      );

      setFilteredPhotos([...photosWithNumber, ...photosWithoutNumber]);
    }
  }, [searchNumber, photos]);

  const openModal = (photo) => {
    setSelectedPhoto(photo);
    const index = filteredPhotos.findIndex((p) => p.id === photo.id);
    setSelectedIndex(index);
  };

  const closeModal = useCallback(() => {
    setSelectedPhoto(null);
    setSelectedIndex(null);
  }, []);

  const goToNext = useCallback(() => {
    if (selectedIndex !== null && selectedIndex < filteredPhotos.length - 1) {
      const nextIndex = selectedIndex + 1;
      setSelectedIndex(nextIndex);
      setSelectedPhoto(filteredPhotos[nextIndex]);
    }
  }, [selectedIndex, filteredPhotos]);

  const goToPrevious = useCallback(() => {
    if (selectedIndex !== null && selectedIndex > 0) {
      const prevIndex = selectedIndex - 1;
      setSelectedIndex(prevIndex);
      setSelectedPhoto(filteredPhotos[prevIndex]);
    }
  }, [selectedIndex, filteredPhotos]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedPhoto) return;

      if (e.key === "ArrowLeft") {
        goToPrevious();
      } else if (e.key === "ArrowRight") {
        goToNext();
      } else if (e.key === "Escape") {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedPhoto, goToNext, goToPrevious, closeModal]);

  const handlePurchase = async () => {
    if (stripeCheckoutUrl) {
      window.location.href = stripeCheckoutUrl;
    } else {
      console.error('Stripe checkout URL not configured for this event');
    }
  };

  const clearSearch = () => {
    setSearchNumber("");
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
  };

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loader}></div>
        <p>Chargement des photos...</p>
      </div>
    );
  }

  return (
    <div className={styles.galleryContainer}>
      {/* Filtre extensible inline */}
      <div
        className={`${styles.filterToggle} ${
          showFilter ? styles.filterExpanded : ""
        }`}
      >
        {!showFilter ? (
          <button
            className={styles.filterButton}
            onClick={() => setShowFilter(true)}
          >
            <FaSearch /> Filtrer par numéro
          </button>
        ) : (
          <div className={styles.filterInputWrapper}>
            <FaSearch className={styles.filterIcon} />
            <input
              type="text"
              placeholder="Numéro recherché..."
              value={searchNumber}
              onChange={(e) => setSearchNumber(e.target.value)}
              className={styles.filterInput}
              autoFocus
            />
            <button
              onClick={() => {
                setShowFilter(false);
                clearSearch();
              }}
              className={styles.filterCloseButton}
            >
              <FaTimes />
            </button>
          </div>
        )}
      </div>

      <div className={styles.photoGrid}>
        {filteredPhotos.length === 0 ? (
          <div className={styles.noResults}>
            <p>Aucune photo trouvée pour ce numéro</p>
          </div>
        ) : (
          filteredPhotos.map((photo) => {
            const largeSize = photo.sizes?.find(
              (size) => size.label === "Large" || size.label === "Medium 800"
            );
            if (!largeSize) return null;

            return (
              <div
                key={photo.id}
                className={styles.photoCard}
                onClick={() => openModal(photo)}
                onContextMenu={handleContextMenu}
              >
                <div className={styles.photoWrapper}>
                  <Image
                    src={largeSize.source}
                    alt={extractText(photo.title)}
                    width={400}
                    height={300}
                    className={styles.photo}
                    style={{
                      objectFit: "cover",
                      userSelect: "none",
                      pointerEvents: "none",
                    }}
                    draggable={false}
                    unoptimized
                  />
                  <div className={styles.photoOverlay}>
                    <FaSearch className={styles.zoomIcon} />
                  </div>
                </div>
                {photo.numbers && photo.numbers.length > 0 && (
                  <div className={styles.numbersTag}>
                    {photo.numbers.map((number, index) => (
                      <span key={index} className={styles.numberBadge}>
                        #{number}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {selectedPhoto && (
        <div className={styles.modal} onClick={closeModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button className={styles.closeButton} onClick={closeModal}>
              <FaTimes />
            </button>

            {selectedIndex > 0 && (
              <button
                className={styles.navButton}
                style={{ left: "20px" }}
                onClick={goToPrevious}
              >
                <span className={styles.navArrow}>‹</span>
              </button>
            )}
            {selectedIndex < filteredPhotos.length - 1 && (
              <button
                className={styles.navButton}
                style={{ right: "20px" }}
                onClick={goToNext}
              >
                <span className={styles.navArrow}>›</span>
              </button>
            )}

            <div
              className={styles.modalImageWrapper}
              onContextMenu={handleContextMenu}
            >
              {(() => {
                const largeSize = selectedPhoto.sizes?.find(
                  (size) =>
                    size.label === "Large" || size.label === "Large 1600"
                );
                if (!largeSize) return null;

                return (
                  <Image
                    src={largeSize.source}
                    alt={extractText(selectedPhoto.title)}
                    width={1200}
                    height={800}
                    className={styles.modalImage}
                    style={{
                      objectFit: "contain",
                      userSelect: "none",
                      pointerEvents: "none",
                    }}
                    draggable={false}
                    unoptimized
                  />
                );
              })()}
            </div>

            <div className={styles.modalInfo}>
              <h3>{extractText(selectedPhoto.title)}</h3>
              {extractText(selectedPhoto.description) && (
                <p className={styles.description}>
                  {extractText(selectedPhoto.description)}
                </p>
              )}
              {selectedPhoto.numbers && selectedPhoto.numbers.length > 0 && (
                <div className={styles.modalNumbers}>
                  <strong>Numéros:</strong>{" "}
                  {selectedPhoto.numbers.map((number, index) => (
                    <span key={index} className={styles.numberBadge}>
                      #{number}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className={styles.purchaseBanner}>
        <div className={styles.bannerContent}>
          <p className={styles.bannerText}>
            Téléchargez toutes les photos après paiement
          </p>
          <button
            className={styles.bannerButton}
            onClick={handlePurchase}
            disabled={isPurchasing || !stripeCheckoutUrl}
          >
            <FaShoppingCart />
            {isPurchasing ? "Traitement..." : "Accéder au paiement"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventGallery;
