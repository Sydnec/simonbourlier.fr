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
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3004',
        pathname: '/events/**',
      },
      {
        protocol: 'https',
        hostname: 'photos-api.simonbourlier.fr',
        pathname: '/events/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/triathlon-cevennes-2025',
        destination: '/photos',
        permanent: true,
      },
    ];
  },
};
export default nextConfig;
