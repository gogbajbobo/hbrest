const
    express = require('express'),
    router = express.Router(),
    User = require('../models/User'),
    debug = require('debug')('hbrest: userRoutes');

router.route('/users')

    .get((req, res) => {

        User.find(req.query, (err, users) => {

            if (err) {
                return res.status(400).json({error: true, message: err.toLocaleString()});
            }

            res.status(200).json(users);

        });

    })

    .post((req, res) => {

        const username = req.body.username;
        const password = req.body.password;

        User.register(new User({username}), password, (err, user) => {

            if (err) {
                return res.status(400).json({error: true, message: err.toLocaleString()});
            }

            res.status(200).json(user);

        });

    });

router.route('/users/:id')

    .get((req, res) => {

        const userId = req.params.id;

        User.findById(userId, (err, user) => {

            if (err) {
                return res.status(400).json({error: true, message: err.toLocaleString()});
            }

            res.status(200).json(user);

        });

    })

    .put((req, res) => {

        User.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, user) => {

            if (err) {
                return res.status(400).json({error: true, message: err.toLocaleString()});
            }

            res.status(200).json(user);

        });

    })

    .delete((req, res) => {

        User.findByIdAndRemove(req.params.id, (err, user) => {

            if (err) {
                return res.status(400).json({error: true, message: err.toLocaleString()});
            }

            res.status(200).json(user);

        });

    });


module.exports = router;