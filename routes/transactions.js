const
    debug = require('debug')('hbrest:transactionRoutes'),
    router = require('express').Router(),
    _ = require('lodash'),
    routesHelper = require('./helpers/routesHelper');

const {Transaction, Transactions} = require('../models/Transaction.model');

module.exports = () => {

    setupRoutes();
    return router;

};

function setupRoutes() {

    debug('transactionRoutes init');

    router.route('/transactions')

        .get((req, res) => {

            if (_.keys(req.query).length > 0) {
                routesHelper.responseWithObjectWithParams(res, req.query, Transactions);
            } else {
                routesHelper.responseWithAllObjects(res, Transactions);
            }

        })

        .post((req, res) => {
            routesHelper.createObjectWithParams(res, req.body, Transaction);
        });

    router.route('/transactions/:id')

        .get((req, res) => {
            routesHelper.getObjectWithId(res, req.params.id, Transaction);
        })

        .put((req, res) => {
            routesHelper.updateObjectWithParams(res, req.params.id, req.body, Transaction);
        })

        .delete((req, res) => {
            routesHelper.deleteObjectWithId(res, req.params.id, Transaction);
        });

}
