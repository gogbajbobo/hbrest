const
    express = require('express'),
    router = express.Router();

router.route('/register')
    .all((req, res, next) => {

    res.status(404).json({
        error: true,
        message: 'register',
        data: {
            API: 'HomeBudget REST API',
            version: '1.0'
        }
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