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
};

export default nextConfig;
