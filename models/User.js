const passportLocalMongoose = require('passport-local-mongoose');

const {mongoose, Schema, ObjectId, Decimal128, AbstractBase, _} = require('../models/AbstractBase');

const User = new Schema(
    _.assign({}, AbstractBase, {
        username: String,
        accountTypes: [{type: ObjectId, ref: 'AccountType'}],
        accounts: [{type: ObjectId, ref: 'Account'}],
        transactions: [{type: ObjectId, ref: 'Transaction'}]
    })
);

User.static({
    apiPath: 'users'
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);
