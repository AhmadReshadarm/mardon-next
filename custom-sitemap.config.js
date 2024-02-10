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
        userAgen: '*',
        disallow: '/rekvizity-ep-d',
      },
      {
        userAgen: '*',
        disallow: '/help',
      },
      {
        userAgen: '*',
        disallow: '/return-policy',
      },
      {
        userAgen: '*',
        disallow: '/how-to-buy',
      },
      {
        userAgen: '*',
        disallow: '/discount',
      },
      {
        userAgen: '*',
        disallow: '/guarantee',
      },
      {
        userAgen: '*',
        disallow: '/delivery',
      },
      {
        userAgen: '*',
        disallow: '/offerta',
      },
      {
        userAgen: '*',
        disallow: '/info-refund',
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
