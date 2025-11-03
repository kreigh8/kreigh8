import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL('https://quick-sockeye-353.convex.cloud/**')]
  }
}

export default nextConfig
