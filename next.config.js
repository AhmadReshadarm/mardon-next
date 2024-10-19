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
  async headers() {
    return [
      {
        source: '/fonts/circe/circe-regular.woff',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000',
          },
        ],
      },
      {
        source: '/fonts/circe/circe-extra-bold.woff',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000',
          },
        ],
      },
      {
        source: '/fonts/circe/circe-bold.woff',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000',
          },
        ],
      },
      {
        source: '/fonts/tt-ricordi-marmo-trial-variable.woff',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000',
          },
        ],
      },
      {
        source: '/fonts/Jost/Jost-Regular.woff2',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000',
          },
        ],
      },
      {
        source: '/favicon.svg',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000',
          },
        ],
      },
    ];
  },
  reactStrictMode: true,
};

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = withBundleAnalyzer(nextConfig);
