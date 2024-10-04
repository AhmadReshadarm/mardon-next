module.exports = {
  i18n: {
    locales: ['ru'],
    defaultLocale: 'ru',
  },
  images: {
    // domains: ['avatars.dicebear.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.dicebear.com',
        pathname: '**',
      },
    ],
  },
};
