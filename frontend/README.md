# Frontend - Simon Bourlier

Application Next.js pour le site web de Simon Bourlier.

## Installation

```bash
npm install
```

## Développement

```bash
npm run dev
```

Le site sera accessible sur `http://localhost:3000`

## Variables d'environnement

Créez un fichier `.env.local` avec :

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

En production :
```env
NEXT_PUBLIC_API_URL=https://photo-api.simonbourlier.fr
```

## Build

```bash
npm run build
npm start
```

## Structure

- `src/pages/` - Pages Next.js
- `src/components/` - Composants React réutilisables
- `src/styles/` - Fichiers CSS modules
- `public/` - Assets statiques

## Fonctionnalités

- Affichage dynamique des événements depuis l'API Go
- Galerie photos avec filtre par numéro
- Système de paiement Stripe intégré
- Protection anti-téléchargement des images
- Design responsive
