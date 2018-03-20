const
    express = require('express'),
    router  = express.Router(),
    log     = require(process.cwd() + '/libs/logger')(module),
    User    = require(process.cwd() + '/models/User');

router.route('/register')
    .get((req, res, next) => {

        res.status(404).json({
            error: true,
            message: 'register page is not ready yet',
            data: {
                API: 'HomeBudget REST API',
                version: '1.0'
            }
        });

    })
    .post((req, res, next) => {

        const {username, password} = req.body;

        if (!username || !password) {

            log.error('both `username` and `password` are required');

            return res.status(400).json({
                error: true,
                message: 'both `username` and `password` are required',
            });

        }

        log.info('registering user', username);

        User.register(new User({username}), password, (err) => {

            if (err) {
                log.error('error while user register:', err.toLocaleString());
                return next(err);
            }

            log.info('user successfully registered');
            res.redirect('/');

        });

    });

router.route('/login')
    .all((req, res, next) => {

        res.status(404).json({
            error: true,
            message: 'login',
            data: {
                API: 'HomeBudget REST API',
                version: '1.0'
            }
        });

    });

router.route('/logout')
    .all((req, res, next) => {

        res.status(404).json({
            error: true,
            message: 'logout',
            data: {
                API: 'HomeBudget REST API',
                version: '1.0'
            }
        });

    });

module.exports = router;