const
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId,
    Decimal128 = Schema.Types.Decimal128,
    _ = require('lodash');

const AbstractBase = {
    created: {
        type: Date,
        default: Date.now
    }
};

module.exports = {mongoose, Schema, ObjectId, Decimal128, AbstractBase, _};
