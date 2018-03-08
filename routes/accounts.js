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
                routesHelper.responseWithObjectWithParams(res, req.query, Accounts);
            } else {
                routesHelper.responseWithAllObjects(res, Accounts);
            }

        })

        .post((req, res) => {
            routesHelper.createObjectWithParams(res, req.body, Account);
        });

    router.route('/accounts/:id')

        .get((req, res) => {
            routesHelper.getObjectWithId(res, req.params.id, Account);
        })

        .put((req, res) => {
            routesHelper.updateObjectWithParams(res, req.params.id, req.body, Account);
        })

        .delete((req, res) => {
            routesHelper.deleteObjectWithId(res, req.params.id, Account);
        });

}
