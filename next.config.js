/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost','b.customroastgroup.com'], // Add your backend host here
  },
};

module.exports = nextConfig;
