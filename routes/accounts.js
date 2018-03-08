const
    debug = require('debug')('hbrest:accountRoutes'),
    knex = require('../db/knex'),
    Bookshelf = require('bookshelf')(knex),
    router = require('express').Router(),
    uuidv4 = require('uuid/v4'),
    routesHelper = require('./routesHelper');

module.exports = () => {

    setupRoutes();
    return router;

};

function setupRoutes() {

    debug('accountRoutes init');

    const Account = Bookshelf.Model.extend({
        tableName: 'accounts'
    });

    const Accounts = Bookshelf.Collection.extend({
        model: Account
    });

    router.route('/accounts')

        .get((req, res) => {

            Accounts.forge()
                .fetch()
                .then(collection => {
                    routesHelper.responseWithObject(res, collection);
                })
                .catch(err => {
                    routesHelper.responseWithError(res, err);
                });
        })

        .post((req, res) => {

            Account.forge({
                name: req.body.name,
                value: req.body.value,
                currency: req.body.currency,
                xid: req.body.xid || uuidv4(),
                accountType_id: req.body.accountType_id
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
