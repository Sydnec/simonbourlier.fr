# Frontend - Simon Bourlier

Application Next.js pour le site web de Simon Bourlier.

## Installation

Node.js 22 ou 24 (LTS) est requis ; Next.js 16 exige au minimum la 20.9.

```bash
npm install
```

## Développement

```bash
npm run dev
```

Le site sera accessible sur `http://localhost:3000`

## Variables d'environnement

Créez un fichier `.env.local` (modèle : `.env.example`) avec :

```env
# Galerie : album Flickr lu côté serveur par /api/photos
FLICKR_API_KEY=
FLICKR_USER_ID=
FLICKR_ALBUM_ID=

# Formulaire de contact (EmailJS)
NEXT_PUBLIC_EMAIL_SERVICE_ID=
NEXT_PUBLIC_EMAIL_TEMPLATE_ID=
NEXT_PUBLIC_EMAIL_ACCOUNT_ID=
```

En production, les mêmes variables sont à définir dans le projet Vercel. Les `NEXT_PUBLIC_*` sont
intégrées au build : un redéploiement est nécessaire après les avoir modifiées.

## Build

```bash
npm run lint
npm run build
npm start
```

## Structure

- `src/pages/` - Pages Next.js
- `src/components/` - Composants React réutilisables
- `src/styles/` - Fichiers CSS modules
- `public/` - Assets statiques

## Fonctionnalités

- Galerie photos alimentée par un album Flickr
- Logos des clients lus depuis `public/images/customers/`
- Formulaire de contact via EmailJS
- Design responsive
