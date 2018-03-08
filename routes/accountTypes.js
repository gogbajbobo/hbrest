const
    debug = require('debug')('hbrest:accountTypeRoutes'),
    router = require('express').Router(),
    _ = require('lodash'),
    routesHelper = require('./helpers/routesHelper');

const {AccountType, AccountTypes} = require('../models/AccountType.model');

module.exports = () => {

    setupRoutes();
    return router;

};

function setupRoutes() {

    debug('accountTypeRoutes init');

    router.route('/accountTypes')

        .get((req, res) => {

            if (_.keys(req.query).length > 0) {
                routesHelper.responseWithObjectWithParams(res, req.query, AccountTypes);
            } else {
                routesHelper.responseWithAllObjects(res, AccountTypes);
            }

        })

        .post((req, res) => {
            routesHelper.createObjectWithParams(res, req.body, AccountType);
        });

    router.route('/accountTypes/:id')

        .get((req, res) => {
            routesHelper.getObjectWithId(res, req.params.id, AccountType);
        })

        .put((req, res) => {
            routesHelper.updateObjectWithParams(res, req.params.id, req.body, AccountType);
        })

        .delete((req, res) => {
            routesHelper.deleteObjectWithId(res, req.params.id, AccountType);
        });

}
