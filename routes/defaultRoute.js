const
    express = require('express'),
    router = express.Router();

router.route('*')
    .all((req, res, next) => {

    res.status(404).json({
        error: true,
        message: 'nowhere now here',
        data: {
            API: 'HomeBudget REST API',
            version: '1.0'
        }
    });
    return next();

});

module.exports = router;