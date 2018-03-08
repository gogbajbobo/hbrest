const
    debug = require('debug')('hbrest:accountRoutes'),
    knex = require('../db/knex'),
    Bookshelf = require('bookshelf')(knex),
    router = require('express').Router(),
    uuidv4 = require('uuid/v4'),
    _ = require('lodash'),
    routesHelper = require('./helpers/routesHelper');

const {Account, Accounts} = require('../models/Account.model');

module.exports = () => {

    setupRoutes();
    return router;

};

function setupRoutes() {

    debug('accountRoutes init');
    
    router.route('/accounts')

        .get((req, res) => {

            if (_.keys(req.query).length > 0) {
                responseWithParams(res, req.query);
            } else {
                responseWithAllObjects(res);
            }

        })

        .post((req, res) => {

            debug('create account with params', req.body);

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

    router.route('/accounts/:id')

        .get((req, res) => {

            debug('get account #', req.params.id);

            Account.forge({id: req.params.id})
                .fetch()
                .then(account => {

                    if (!account) {

                        const err = new Error('account #' + req.params.id + ' not found');
                        routesHelper.responseWithError(res, err, 404);

                    } else {
                        routesHelper.responseWithObject(res, account);
                    }

                })
                .catch(err =>  {
                    routesHelper.responseWithError(res, err);
                });

        })

        .put((req, res) => {

            debug('update account #', req.params.id, 'with params', req.body);

            Account.forge({id: req.params.id})
                .fetch({require: true})
                .then(account => {

                    account.save({
                        name: req.body.name || account.get('name'),
                        value: req.body.value || account.get('value'),
                        currency: req.body.currency || account.get('currency'),
                        xid: req.body.xid || account.get('xid'),
                        accountType_id: req.body.accountType_id || account.get('accountType_id')
                    })
                        .then(() => {
                            routesHelper.responseWithObject(res, account);
                        })
                        .catch(err => {
                            routesHelper.responseWithError(res, err);
                        });

                })
                .catch(err => {
                    routesHelper.responseWithError(res, err);
                });

        })

        .delete((req, res) => {

            debug('delete account #', req.params.id);

            Account.forge({id: req.params.id})
                .fetch({require: true})
                .then(account => {

                    account.destroy()
                        .then(() => {
                            routesHelper.responseWithObject(res, account);
                        })
                        .catch(err => {
                            routesHelper.responseWithError(res, err);
                        });

                })
                .catch(err => {
                    routesHelper.responseWithError(res, err);
                });

        });

}

function responseWithAllObjects(res) {

    debug('get all accounts');

    Accounts.forge()
        .fetch()
        .then(collection => {
            routesHelper.responseWithObject(res, collection);
        })
        .catch(err => {
            routesHelper.responseWithError(res, err);
        });

}

function responseWithParams(res, params) {

    debug('get accounts with params', params);

    Accounts.forge()
        .query('where', params)
        .fetch()
        .then(accounts => {

            if (!accounts) {

                const err = new Error('accountType with params ' + params + ' not found');
                routesHelper.responseWithError(res, err, 404);

            } else {
                routesHelper.responseWithObject(res, accounts);
            }

        })
        .catch(err =>  {
            routesHelper.responseWithError(res, err);
        });

}