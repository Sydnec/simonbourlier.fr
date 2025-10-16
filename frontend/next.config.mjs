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
        port: '8080',
        pathname: '/events/**',
      },
      {
        protocol: 'https',
        hostname: 'photo-api.simonbourlier.fr',
        pathname: '/events/**',
      },
    ],
  },
};
export default nextConfig;
