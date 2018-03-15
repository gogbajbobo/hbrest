const {mongoose, Schema, ObjectId, Decimal128, AbstractBase, _} = require('../models/AbstractBase');

const Transaction = new Schema(
    _.assign({}, AbstractBase, {
        date: {type: Date, default: Date.now},
        fromValue: Decimal128,
        toValue: Decimal128,
        fromAccount: [{type: ObjectId, ref: 'Account'}],
        toAccount: [{type: ObjectId, ref: 'Account'}],
        user: {type: ObjectId, ref: 'User'}
    })
);

Transaction.static({
    apiPath: 'transactions'
});

module.exports = mongoose.model('Transaction', Transaction);
