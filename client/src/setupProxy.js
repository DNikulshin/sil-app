const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api/claim',
        createProxyMiddleware({
            target: 'http://localhost:7777',
            changeOrigin: true,
        })
    );
};
