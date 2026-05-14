/** @type {import('next').NextConfig} */
const isGithubPages = process.env.NEXT_STATIC_EXPORT === 'true'

const nextConfig = {
  ...(isGithubPages ? { output: 'export' } : {}),
  images: {
    domains: ['i.imgur.com'],
    unoptimized: isGithubPages,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig