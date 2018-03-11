const proxy = require('http-proxy').createProxyServer();

const authRedirect = (req, res, next) => {

    proxy.web(req, res, {
        target: 'http://localhost:8887'
    }, next);

};

module.exports = authRedirect;
