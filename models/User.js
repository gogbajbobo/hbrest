const
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');

const ObjectId = Schema.Types.ObjectId;

const User = new Schema({
    username: String,
    accountTypes: [{type: ObjectId, ref: 'AccountType'}],
    accounts: [{type: ObjectId, ref: 'Account'}],
    transactions: [{type: ObjectId, ref: 'Transaction'}]
});

User.static({
    apiPath: 'users'
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);
