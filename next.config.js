/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['files.stripe.com'],
  },
};

module.exports = nextConfig;
