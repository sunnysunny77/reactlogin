const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:8888/api',
      changeOrigin: true,
    })
  );
  app.use(
    '/captcha',
    createProxyMiddleware({
      target: 'https://localhost:3006/captcha',
      changeOrigin: true,
      secure: false,
    })
  );
};