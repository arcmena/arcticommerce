/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.shopify.com']
  },
  eslint: {
    ignoreDuringBuilds: true
  }
}

module.exports = nextConfig
