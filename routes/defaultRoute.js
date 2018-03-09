const
    _ = require('lodash');

_.assign(exports, {
    defaultRoute
});

function defaultRoute(req, res, next) {

    res.status(404).json({error: false, data: {API: 'HomeBudget REST API', version: '1.0'}});
    return next();

}
