const _ = require('lodash');

_.assign(exports, {
    responseWithObject,
    responseWithError
});

function responseWithObject(res, obj) {
    res.json({error: false, data: obj.toJSON()});
}

function responseWithError(res, err) {
    res.status(500).json({error: true, data: {message: err.message}});
}