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

}
