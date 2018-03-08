const
    debug = require('debug')('hbrest:accountTypeRoutes'),
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

    debug('accountTypeRoutes init');

    const AccountType = Bookshelf.Model.extend({
        tableName: 'accountTypes',
        hasTimestamps: true
    });

    const AccountTypes = Bookshelf.Collection.extend({
        model: AccountType
    });

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
