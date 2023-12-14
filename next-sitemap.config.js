/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.BASE_URL || 'https://www.kurune.okinawa',
    generateRobotsTxt: true,
    exclude: ['/server-sitemap.xml'],
    robotsTxtOptions: {
    additionalSitemaps: [
        process.env.BASE_URL + "/api/server-sitemap.xml",
    ],
  }
}
