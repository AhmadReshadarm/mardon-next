const siteUrl = 'https://nbhoz.ru';

module.exports = {
  siteUrl,
  generateRobotsTxt: false,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        disallow: '/admin',
      },
      {
        userAgent: '*',
        disallow: '/admin/*',
      },
      {
        userAgent: '*',
        disallow: '/checkout',
      },
      {
        userAgent: '*',
        disallow: '/checkout/*',
      },
      {
        userAgent: '*',
        disallow: '/cart',
      },
      {
        userAgent: '*',
        disallow: '/cart/*',
      },
      {
        userAgent: '*',
        disallow: '/profile',
      },
      {
        userAgent: '*',
        disallow: '/profile/*',
      },
      {
        userAgent: '*',
        disallow: '/orders',
      },
      {
        userAgent: '*',
        disallow: '/orders/*',
      },
      {
        userAgent: '*',
        disallow: '/wishlist',
      },
      {
        userAgent: '*',
        disallow: '/wishlist/*',
      },
      {
        userAgent: '*',
        disallow: '/after-payment',
      },
      {
        userAgent: '*',
        disallow: '/after-payment/*',
      },
      {
        userAgent: '*',
        disallow: '/rekvizity-ep-d',
      },
      {
        userAgent: '*',
        disallow: '/help',
      },
      {
        userAgent: '*',
        disallow: '/return-policy',
      },
      {
        userAgent: '*',
        disallow: '/how-to-buy',
      },
      {
        userAgent: '*',
        disallow: '/discount',
      },
      {
        userAgent: '*',
        disallow: '/guarantee',
      },
      {
        userAgent: '*',
        disallow: '/delivery',
      },
      {
        userAgent: '*',
        disallow: '/offerta',
      },
      {
        userAgent: '*',
        disallow: '/info-refund',
      },
      ,
      {
        userAgent: '*',
        disallow: '/user-agreement',
      },
      {
        userAgent: '*',
        disallow: '/privacy',
      },
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: '*',
        allow: '/*',
      },
    ],
    additionalSitemaps: [
      `${siteUrl}/server-sitemap.xml`,
      `${siteUrl}/sitemap.xml`,
    ],
  },
  exclude: [
    '/admin',
    '/admin/*',
    '/checkout',
    '/checkout/*',
    '/cart',
    '/cart/*',
    '/profile',
    '/profile/*',
    '/orders',
    '/orders/*',
    '/wishlist',
    '/wishlist/*',
    '/after-payment',
    '/after-payment/*',
    '/rekvizity-ep-d',
    '/help',
  ],
};
