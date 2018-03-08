const
    debug = require('debug')('hbrest:transactionRoutes'),
    knex = require('../db/knex'),
    Bookshelf = require('bookshelf')(knex),
    router = require('express').Router(),
    uuidv4 = require('uuid/v4'),
    routesHelper = require('./helpers/routesHelper');

module.exports = () => {

    setupRoutes();
    return router;

};

function setupRoutes() {

    debug('transactionRoutes init');

    const Transaction = Bookshelf.Model.extend({
        tableName: 'transactions',
        hasTimestamps: true
    });

    const Transactions = Bookshelf.Collection.extend({
        model: Transaction
    });

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
