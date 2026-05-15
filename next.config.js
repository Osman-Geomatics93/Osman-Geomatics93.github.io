/** @type {import('next').NextConfig} */
const withPWA = require('@ducanh2912/next-pwa').default

const isGithubPages = process.env.NEXT_STATIC_EXPORT === 'true'

const nextConfig = {
  ...(isGithubPages ? { output: 'export' } : {}),
  images: {
    domains: ['avatars.githubusercontent.com'],
    unoptimized: isGithubPages,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

// PWA is only active in production (Vercel) — disabled locally to avoid dev noise
module.exports = withPWA({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  reloadOnOnline: true,
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
})(nextConfig)
