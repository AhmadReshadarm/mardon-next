import { baseUrl } from 'common/constant';

const settings = {
  graphql: {
    uri: baseUrl,
  },
  meta: {
    rootUrl: baseUrl,
    title: 'Fingarden',
    description: 'Fingarden, где вы найдете удовольствие',
    social: {
      graphic:
        'https://cheatcode-assets.s3.amazonaws.com/default-social-graphic.png',
      twitter: '@fingarden',
    },
  },
  routes: {
    authenticated: {
      pathAfterFailure: '/',
    },
    public: {
      pathAfterFailure: '/',
    },
  },
};

export { settings };
