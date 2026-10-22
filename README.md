# Simon Bourlier - Site Web

Site web personnel de Simon Bourlier, photographe événementiel.

## Architecture

Le projet est un frontend Next.js déployé directement sur Vercel, sans backend.

### 📱 Frontend (Next.js)
Interface web responsive avec galerie photos (album Flickr) et formulaire de contact.

**Voir [frontend/README.md](frontend/README.md) pour plus de détails**

## Installation

```bash
cd frontend
npm install
npm run dev
```

Le site sera accessible sur `http://localhost:3000`

## Fonctionnalités

- ✅ **Galerie photos** - Album Flickr servi par la route `/api/photos`
- ✅ **Références clients** - Logos lus depuis `public/images/customers/`
- ✅ **Formulaire de contact** - Envoi via EmailJS
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
└── README.md
```

## Production

Le frontend est déployé sur Vercel. Pour vérifier le build en local :

```bash
cd frontend
npm run build
```

Les variables d'environnement à configurer sur Vercel sont listées dans [frontend/README.md](frontend/README.md).
