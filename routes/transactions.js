const
    debug = require('debug')('hbrest:transactionRoutes'),
    knex = require('../db/knex'),
    Bookshelf = require('bookshelf')(knex),
    router = require('express').Router(),
    uuidv4 = require('uuid/v4'),
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

            Transactions.forge()
                .fetch()
                .then(collection => {
                    routesHelper.responseWithObject(res, collection);
                })
                .catch(err => {
                    routesHelper.responseWithError(res, err);
                });

        })

        .post((req, res) => {

            Transaction.forge({
                xid: req.body.xid || uuidv4()
            })
                .save()
                .then(account => {
                    routesHelper.responseWithObject(res, account);
                })
                .catch(err => {
                    routesHelper.responseWithError(res, err);
                });

        });

}
