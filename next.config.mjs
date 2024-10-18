/** @type {import('next').NextConfig} */
const nextConfig = {
    pageExtensions: ['js', 'jsx'],
    webpack(config) {
        config.resolve.modules.push(__dirname + '/src');
        return config;
    },
};
