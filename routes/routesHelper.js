const
    _ = require('lodash'),
    debug = require('debug')('hbrest:routes');

_.assign(exports, {
    responseWithAllObjects,
    responseWithObjectWithParams,
    createObjectWithParams,
    getObjectWithId,
    updateObjectWithParams,
    deleteObjectWithId
});

function responseWithObject(res, obj) {
    res.json({error: false, data: obj.toJSON()});
}

function responseWithError(res, err, code = 500) {
    res.status(code).json({error: true, data: {message: err.message}});
}

function responseWithAllObjects(res, collectionModel) {

    debug('get all', collectionModel.logName);

    collectionModel.forge()
        .fetch()
        .then(collection => {
            responseWithObject(res, collection);
        })
        .catch(err => {
            responseWithError(res, err);
        });

}

function responseWithObjectWithParams(res, params, collectionModel) {

    debug('get', collectionModel.logName, 'with params', params);

    collectionModel.forge()
        .query('where', params)
        .fetch()
        .then(collection => {

            if (!collection) {

                const err = new Error(collectionModel.logName, 'with params ' + params + ' not found');
                responseWithError(res, err, 404);

            } else {
                responseWithObject(res, collection);
            }

        })
        .catch(err =>  {
            responseWithError(res, err);
        });

}

function createObjectWithParams(res, params, objectModel) {

    debug('create', objectModel.logName, 'with params', params);

    objectModel.forge(objectModel.creationProperties(params))
        .save()
        .then(object => {
            responseWithObject(res, object);
        })
        .catch(err => {
            responseWithError(res, err);
        });

}

function getObjectWithId(res, id, objectModel) {

    debug('get', objectModel.logName, '#', id);

    objectModel.forge({id})
        .fetch()
        .then(object => {

            if (!object) {

                const err = new Error(objectModel.logName + ' #' + id + ' not found');
                responseWithError(res, err, 404);

            } else {
                responseWithObject(res, object);
            }

        })
        .catch(err =>  {
            responseWithError(res, err);
        });

}

function updateObjectWithParams(res, id, params, objectModel) {

    debug('update', objectModel.logName, '#', id, 'with params', params);

    objectModel.forge({id})
        .fetch({require: true})
        .then(object => {

            object.save(objectModel.updatingProperties(params, object))
                .then(() => {
                    responseWithObject(res, object);
                })
                .catch(err => {
                    responseWithError(res, err);
                });

        })
        .catch(err => {
            responseWithError(res, err);
        });

}

function deleteObjectWithId(res, id, objectModel) {

    debug('delete', objectModel.logName, '#', id);

    objectModel.forge({id})
        .fetch({require: true})
        .then(object => {

            object.destroy()
                .then(() => {
                    responseWithObject(res, object);
                })
                .catch(err => {
                    responseWithError(res, err);
                });

        })
        .catch(err => {
            responseWithError(res, err);
        });

}