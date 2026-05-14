/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://osman-geomatics93.github.io',
  generateRobotsTxt: true,
  outDir: './out',
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }],
  },
  changefreq: 'monthly',
  priority: 0.7,
  sitemapSize: 5000,
}
