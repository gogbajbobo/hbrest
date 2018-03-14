const
    express = require('express'),
    router = express.Router(),
    User = require('../models/User'),
    debug = require('debug')('hbrest: userRoutes');

router.route('/users')

    .get((req, res) => {

        debug('users get');

        User.find({}, (err, users) => {

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

module.exports = router;