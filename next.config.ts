import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      new URL('https://quick-sockeye-353.convex.cloud/**'),
      new URL('https://clean-terrier-44.convex.cloud/**')
    ]
  },
  // Proxies the resume download through our own domain instead of linking
  // directly to the Convex deployment's *.convex.site URL, so that domain
  // is never exposed to visitors.
  async rewrites() {
    return [
      {
        source: '/resume/download',
        destination: `${process.env.NEXT_PUBLIC_CONVEX_SITE_URL}/resume/download`
      }
    ]
  }
}

export default nextConfig
