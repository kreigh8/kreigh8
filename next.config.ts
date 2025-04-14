import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    domains: ['localhost', 'res.cloudinary.com']
  },
  env: {
    NEXT_GOOGLE_CAPTHA_KEY: process.env.NEXT_GOOGLE_CAPTHA_KEY
  }
}

export default nextConfig
