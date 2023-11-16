import { createProxyMiddleware } from 'http-proxy-middleware';

export const config = {
  api: {
    bodyParser: false,
  },
};

const proxy = createProxyMiddleware({
  target: 'http://62.217.179.49:4010', // production server
  // target: 'http://95.165.95.110:4010', // dev server
  changeOrigin: true,
  pathRewrite: {
    '^/api/': '/', // remove base path
  },
});

export default proxy;
