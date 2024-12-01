const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:8888',
      changeOrigin: true,
    })
  );
  app.use(
    '/captcha',
    createProxyMiddleware({
      target: 'https://localhost:3006',
      changeOrigin: true,
      secure: false,
    })
  );
};