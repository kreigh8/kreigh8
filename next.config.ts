import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'res.cloudinary.com'
        // You can add these as well
        // port: '',
        // pathname: 'arifscloud/image/upload/**',
      }
    ]
  }
}

export default nextConfig
