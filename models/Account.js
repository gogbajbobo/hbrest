const {mongoose, Schema, ObjectId, Decimal128, AbstractBase, _} = require('../models/AbstractBase');

const Account = new Schema(
    _.assign({}, AbstractBase, {
        created: {type: Date, default: Date.now},
        name: String,
        value: Number,
        currency: String,
        accountType: {type: ObjectId, ref: 'AccountType'},
        mainAccount: {type: ObjectId, ref: 'Account'},
        user: {type: ObjectId, ref: 'User'},
        subAccounts: [{type: ObjectId, ref: 'Account'}],
        outTransactions: [{type: ObjectId, ref: 'Transaction'}],
        inTransactions: [{type: ObjectId, ref: 'Transaction'}]
    })
);

Account.static({
    apiPath: 'accounts'
});

module.exports = mongoose.model('Account', Account);
