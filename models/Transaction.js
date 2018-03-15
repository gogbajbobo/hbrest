const
    mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const
    ObjectId = Schema.Types.ObjectId,
    Decimal128 = Schema.Types.Decimal128;

const Transaction = new Schema({
    date: {type: Date, default: Date.now},
    fromValue: Decimal128,
    toValue: Decimal128,
    fromAccount: [{type: ObjectId, ref: 'Account'}],
    toAccount: [{type: ObjectId, ref: 'Account'}],
    user: {type: ObjectId, ref: 'User'}
});

Transaction.static({
    apiPath: 'transactions'
});

module.exports = mongoose.model('Transaction', Transaction);
