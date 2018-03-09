const
    router = require('express').Router(),
    _ = require('lodash'),
    routesHelper = require('./routesHelper'),
    path = require('path');

const models = [
    require('../models/Account.model'),
    require('../models/AccountType.model'),
    require('../models/Transaction.model')
];

module.exports = () => {

    _.forEach(models, model => {
        setupRoutes(model.objectModel, model.collectionModel)
    });
    return router;

};

function setupRoutes(objectModel, collectionModel) {

    router.route(path.join('/', collectionModel.path))

        .get((req, res) => {

            if (_.keys(req.query).length > 0) {
                routesHelper.responseWithObjectWithParams(res, req.query, collectionModel);
            } else {
                routesHelper.responseWithAllObjects(res, collectionModel);
            }

        })

        .post((req, res) => {
            routesHelper.createObjectWithParams(res, req.body, objectModel);
        });

    router.route(path.join('/', collectionModel.path, ':id'))

        .get((req, res) => {
            routesHelper.getObjectWithId(res, req.params.id, objectModel);
        })

        .put((req, res) => {
            routesHelper.updateObjectWithParams(res, req.params.id, req.body, objectModel);
        })

        .delete((req, res) => {
            routesHelper.deleteObjectWithId(res, req.params.id, objectModel);
        });

}
