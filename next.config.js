/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true
  },
  images: {
    domains: ["supermomos-app-resources-us.s3.amazonaws.com"]
  }
}

module.exports = nextConfig
