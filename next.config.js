/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true
  },
  images: {
    domains: ["supermomos-app-resources-us.s3.amazonaws.com"]
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/social',
        permanent: true,
      },
    ]
  }
}

module.exports = nextConfig
