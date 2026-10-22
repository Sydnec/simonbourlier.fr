import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx'],
  webpack(config) {
    config.resolve.modules.push(path.resolve(process.cwd(), 'src'));
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'live.staticflickr.com',
        pathname: '/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        // Galerie d'un événement passé, retirée avec l'API photos. Temporaire : le slug pourra
        // resservir à une nouvelle galerie sans qu'une 308 reste en cache dans les navigateurs.
        source: '/duathlon-cevennes-2025',
        destination: '/',
        permanent: false,
      },
      {
        // Adresse déjà partagée qui menait vers /photos : même traitement.
        source: '/triathlon-cevennes-2025',
        destination: '/',
        permanent: true,
      },
      {
        // Les navigateurs gardent l'ancienne 308 /triathlon-cevennes-2025 -> /photos : /photos doit
        // donc rediriger aussi. Temporaire, pour pouvoir recréer une page photos sans 308 en cache.
        source: '/photos',
        destination: '/',
        permanent: false,
      },
    ];
  },
};
export default nextConfig;
