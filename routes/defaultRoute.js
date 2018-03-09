const
    debug = require('debug')('hbrest:defaultRoute'),
    router = require('express').Router(),
    _ = require('lodash'),
    routesHelper = require('./helpers/routesHelper');

_.assign(exports, {
    defaultRoute
});

function defaultRoute(req, res, next) {

    res.status(404).json({error: false, data: {API: 'HomeBudget REST API', version: '1.0'}});
    return next();

}
