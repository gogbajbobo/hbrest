const
    debug = require('debug')('hbrest:accountTypeRoutes'),
    knex = require('../db/knex'),
    Bookshelf = require('bookshelf')(knex),
    router = require('express').Router(),
    uuidv4 = require('uuid/v4'),
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

            debug('get all account types');
            debug(req.query);

            AccountTypes.forge()
                .fetch()
                .then(collection => {
                    routesHelper.responseWithObject(res, collection);
                })
                .catch(err => {
                    routesHelper.responseWithError(res, err);
                });

        })

        .post((req, res) => {

            AccountType.forge({
                type: req.body.type,
                xid: req.body.xid || uuidv4()
            })
                .save()
                .then(accountType => {
                    routesHelper.responseWithObject(res, accountType);
                })
                .catch(err => {
                    routesHelper.responseWithError(res, err);
                });

        });

    router.route('/accountTypes/:id')

        .get((req, res) => {

            debug('get account type #', req.params.id);

            AccountType.forge({id: req.params.id})
                .fetch()
                .then(accountType => {

                    if (!accountType) {

                        const err = new Error('accountType #' + req.params.id + ' not found');
                        routesHelper.responseWithError(res, err, 404);

                    } else {
                        routesHelper.responseWithObject(res, accountType);
                    }

                })
                .catch(err =>  {
                    routesHelper.responseWithError(res, err);
                });

        })

        .put((req, res) => {

            AccountType.forge({id: req.params.id})
                .fetch({require: true})
                .then(accountType => {

                    accountType.save({
                        type: req.body.type || accountType.get('type')
                    })
                        .then(() => {
                            routesHelper.responseWithObject(res, accountType);
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

            AccountType.forge({id: req.params.id})
                .fetch({require: true})
                .then(accountType => {

                    accountType.destroy()
                        .then(() => {
                            routesHelper.responseWithObject(res, accountType);
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
