import type { NextConfig } from 'next'

const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control',   value: 'on' },
  { key: 'X-Frame-Options',           value: 'DENY' },
  { key: 'X-Content-Type-Options',    value: 'nosniff' },
  { key: 'Referrer-Policy',           value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy',        value: 'camera=(), microphone=(), geolocation=()' },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://plausible.io",
      "style-src 'self' 'unsafe-inline' https://api.fontshare.com",
      "font-src 'self' https://api.fontshare.com https://cdn.fontshare.com",
      "img-src 'self' data: blob: https://images.unsplash.com",
      "frame-src 'self' https://www.openstreetmap.org",
      "connect-src 'self' https://plausible.io",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join('; '),
  },
]

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 86400,
  },
  typedRoutes: true,
}

export default nextConfig
