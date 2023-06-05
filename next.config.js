/** @type {import('next').NextConfig} */

const path = require('path');
const nextConfig = {
  reactStrictMode: true,

  webpack: (config) => {
    config.resolve.alias['@i18n'] = path.join(__dirname, 'i18n');
    return config;
  },
}

module.exports = nextConfig
