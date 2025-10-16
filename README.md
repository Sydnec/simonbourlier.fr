# Simon Bourlier - Site Web & API Photos

Site web personnel de Simon Bourlier, photographe événementiel, avec système de galeries photos dynamiques.

## Architecture

Le projet est composé de deux parties :

### 📱 Frontend (Next.js)
Interface web responsive avec galeries photos dynamiques et système de paiement Stripe.

**Voir [frontend/README.md](frontend/README.md) pour plus de détails**

### 🚀 API (Go)
API REST pour servir les photos et gérer les événements avec extraction automatique des métadonnées EXIF.

**Voir [api/README.md](api/README.md) pour plus de détails**

## Installation complète

### 1. API Go

```bash
cd api
./install.sh
./start.sh
```

L'API sera accessible sur \`http://localhost:8080\`

### 2. Frontend Next.js

```bash
cd frontend
npm install
npm run dev
```

Le site sera accessible sur \`http://localhost:3000\`

## Fonctionnalités

- ✅ **Galeries dynamiques** - Ajoutez simplement un dossier avec des photos dans \`api/events/\`
- ✅ **Extraction EXIF automatique** - Les numéros sont lus depuis les tags Keywords/Subject
- ✅ **Filtre intelligent** - Recherche par numéro avec affichage optimisé
- ✅ **Paiement Stripe** - Configuration par événement
- ✅ **Protection des images** - Anti-téléchargement et watermark visuel
- ✅ **Responsive** - Compatible mobile, tablette et desktop

## Structure du projet

```
simonbourlier.fr/
├── frontend/          # Application Next.js
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   └── styles/
│   └── public/
├── api/               # API Go
│   ├── main.go
│   ├── events/        # Photos des événements
│   └── events-config.json
└── README.md
```

## Ajout d'un événement

1. Créer un dossier dans \`api/events/\` : \`api/events/mon-evenement-2025/\`
2. Ajouter vos photos avec métadonnées EXIF (Keywords/Subject)
3. Configurer Stripe dans \`api/events-config.json\` :
```json
{
  "mon-evenement-2025": {
    "stripeCheckoutUrl": "https://buy.stripe.com/..."
  }
}
```
4. Redémarrer l'API : \`cd api && ./restart.sh\`

L'événement apparaît automatiquement sur \`/photos\` !

## Ajout de numéros aux photos

Utilisez \`exiftool\` pour ajouter des numéros (dossards, etc.) aux photos :

```bash
# Ajouter des numéros à une photo
exiftool -Keywords="055, 056" -Subject="055, 056" photo.jpg

# Ajouter en masse
exiftool -Keywords="123" -Subject="123" photo1.jpg photo2.jpg
```

Les numéros seront automatiquement extraits et affichés dans la galerie.

## Production

### Frontend (Vercel/Netlify)
```bash
cd frontend
npm run build
```

### API (VPS/Cloud)
```bash
cd api
ENV=production ./start.sh
```

Variables d'environnement à configurer :
- \`ENV=production\` pour l'API
- \`NEXT_PUBLIC_API_URL=https://photo-api.simonbourlier.fr\` pour le frontend