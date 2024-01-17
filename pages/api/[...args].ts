import { createProxyMiddleware } from 'http-proxy-middleware';

export const config = {
  api: {
    bodyParser: false,
  },
};

const proxy = createProxyMiddleware({
  // target: 'http://5.35.93.60:4010', // production server
  target: 'http://95.165.95.110:4010', // dev server
  // target: 'http://localhost:4010', // dev server locally
  changeOrigin: true,
  pathRewrite: {
    '^/api/': '/', // remove base path
  },
});

export default proxy;
