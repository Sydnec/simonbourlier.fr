# API d'Événements - Simon Bourlier

API en Go pour servir les images des événements sportifs.

## Fonctionnalités

- Liste tous les événements disponibles
- Récupère toutes les photos d'un événement spécifique
- Sert les images directement
- Gestion CORS (restriction à `https://simonbourlier.fr` en production)

## Routes

### `GET /events`
Liste tous les événements disponibles.

**Réponse:**
```json
[
  {
    "name": "Duathlon Cevennes 2025",
    "slug": "duathlon-cevennes-2025"
  }
]
```

### `GET /events/{event-slug}/photos`
Récupère toutes les photos d'un événement spécifique.

**Réponse:**
```json
[
  {
    "name": "photo1.jpg",
    "url": "/events/duathlon-cevennes-2025/photo1.jpg"
  },
  {
    "name": "photo2.jpg",
    "url": "/events/duathlon-cevennes-2025/photo2.jpg"
  }
]
```

### `GET /events/{event-slug}/{photo-name}`
Sert directement une image.

**Exemple:** `/events/duathlon-cevennes-2025/photo1.jpg`

### `GET /health`
Health check endpoint.

## Installation Rapide

### Option 1 : Script d'installation automatique (Recommandé)

Le script d'installation installe automatiquement Go et toutes les dépendances nécessaires :

```bash
cd api
./install.sh
```

Le script va :
- Installer Go 1.21.5 si nécessaire
- Configurer le PATH
- Télécharger les dépendances
- Compiler l'API
- Proposer la création d'un service systemd (optionnel)

### Option 2 : Installation manuelle

Si vous avez déjà Go installé :

```bash
cd api
go mod tidy
go build -o photos-api main.go
```

## Utilisation

### Démarrage rapide

Avec les scripts fournis :

```bash
# Démarrer l'API
./start.sh

# Arrêter l'API
./stop.sh
```

### Développement

```bash
cd api
go run main.go
# Ou avec le Makefile
make run
```

L'API démarre par défaut sur le port 8080. En mode développement, toutes les origines sont autorisées.

### Production

```bash
cd api
go build -o photos-api main.go
ENV=production PORT=8080 ./photos-api
```

En production, seules les requêtes provenant de `https://simonbourlier.fr` sont autorisées.

### Service systemd (Production)

Si vous avez choisi de créer un service systemd lors de l'installation :

```bash
# Démarrer le service
sudo systemctl start photos-api

# Arrêter le service
sudo systemctl stop photos-api

# Redémarrer le service
sudo systemctl restart photos-api

# Activer au démarrage
sudo systemctl enable photos-api

# Voir les logs
sudo journalctl -u photos-api -f
```

## Variables d'Environnement

- `PORT`: Port sur lequel l'API écoute (défaut: 8080)
- `ENV`: Environment (`production` ou `prod` pour activer les restrictions CORS)

## Structure des Fichiers

Les images doivent être placées dans le dossier `events/` avec la structure suivante :

```
events/
  duathlon-cevennes-2025/
    photo1.jpg
    photo2.jpg
  triathlon-ales-2025/
    image1.jpg
    image2.jpg
```

## Formats d'Images Supportés

- `.jpg` / `.jpeg`
- `.png`
- `.gif`
- `.webp`
