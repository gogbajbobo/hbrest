const
    request = require('request');

const validator = (req, res, next) => {

    validate(req, (err, success) => {

        if (!success) return res.status(403).send(err.message);

        return next();

    });

};

function validate(req, callback) {

    const options = {
        url: 'http://localhost:8887/',
        headers: {
            'Authorization': req.headers.authorization
        }
    };

    request(options, (err, res) => {

        if (!err && res.statusCode === 200) {
            return callback(null, true);
        }
        return callback(err || new Error(res.body), false);

    });

}

module.exports = validator;