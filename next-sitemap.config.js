/** @type {import('next-sitemap').IConfig} */
const isGithubPages = process.env.NEXT_STATIC_EXPORT === 'true'

module.exports = {
  siteUrl: isGithubPages
    ? 'https://osman-geomatics93.github.io'
    : 'https://osman-geomatics.com',
  generateRobotsTxt: true,
  outDir: isGithubPages ? './out' : './public',
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }],
  },
  changefreq: 'monthly',
  priority: 0.7,
  sitemapSize: 5000,
}
