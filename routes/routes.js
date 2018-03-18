const
    express = require('express'),
    router = express.Router(),
    _ = require('lodash'),
    path = require('path'),
    log = require('../libs/logger')(module);

const modelNames = [
    'Account',
    'AccountType',
    'Transaction',
    'User',
    'Client',
    'AccessToken',
    'RefreshToken'
];

const models = _.map(modelNames, name => {
    return require('../models/' + name);
});

_.forEach(models, Model => {

    let apiPath = path.join('/', Model.apiPath);

    router.route(apiPath)

        .get((req, res) => {

            // log.info('get all', Model.apiPath, 'with params', req.query);

            Model.find(req.query, (err, result) => {
                respondeWithResult(err, result, res);
            });

        })

        .post((req, res) => {

            // log.info('create', Model.apiPath, 'with params', req.body);

            const username = req.body.username;
            const password = req.body.password;

            if (!username || !password) return res.status(400);

            Model.register(new Model({username}), password, (err, result) => {
                respondeWithResult(err, result, res);
            });

        });

    apiPath = path.join(apiPath, ':id');

    router.route(apiPath)

        .get((req, res) => {

            // log.info('get', Model.apiPath, 'with id', req.params.id);

            Model.findById(req.params.id, (err, result) => {
                respondeWithResult(err, result, res);
            });

        })

        .put((req, res) => {

            // log.info('update', Model.apiPath, 'with id', req.params.id, ', params:', req.body);

            Model.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, result) => {
                respondeWithResult(err, result, res);
            });

        })

        .delete((req, res) => {

            // log.info('delete', Model.apiPath, 'with id', req.params.id);

            Model.findByIdAndRemove(req.params.id, (err, result) => {
                respondeWithResult(err, result, res);
            });

        });

});

function respondeWithResult(err, result, res) {

    if (err) {

        log.error(err.toLocaleString());
        return res.sendStatus(500);

    }

    res.status(200).json({error: false, data: result});

}

module.exports = router;