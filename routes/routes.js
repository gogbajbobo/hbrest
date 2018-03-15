const
    express = require('express'),
    router = express.Router(),
    _ = require('lodash'),
    path = require('path'),
    debug = require('debug')('hbrest: userRoutes');

const
    User = require('../models/User');

const models = [User];

_.forEach(models, Model => {

    let apiPath = path.join('/', Model.apiPath);

    router.route(apiPath)

        .get((req, res) => {

            Model.find(req.query, (err, users) => {

                if (err) {
                    return res.status(400).json({error: true, message: err.toLocaleString()});
                }

                res.status(200).json(users);

            });

        })

        .post((req, res) => {

            const username = req.body.username;
            const password = req.body.password;

            Model.register(new Model({username}), password, (err, user) => {

                if (err) {
                    return res.status(400).json({error: true, message: err.toLocaleString()});
                }

                res.status(200).json(user);

            });

        });

    apiPath = path.join(apiPath, ':id')

    router.route(apiPath)

        .get((req, res) => {

            const userId = req.params.id;

            Model.findById(userId, (err, user) => {

                if (err) {
                    return res.status(400).json({error: true, message: err.toLocaleString()});
                }

                res.status(200).json(user);

            });

        })

        .put((req, res) => {

            Model.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, user) => {

                if (err) {
                    return res.status(400).json({error: true, message: err.toLocaleString()});
                }

                res.status(200).json(user);

            });

        })

        .delete((req, res) => {

            Model.findByIdAndRemove(req.params.id, (err, user) => {

                if (err) {
                    return res.status(400).json({error: true, message: err.toLocaleString()});
                }

                res.status(200).json(user);

            });

        });

});

module.exports = router;