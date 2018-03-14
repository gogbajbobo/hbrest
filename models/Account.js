const
    mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const Account = new Schema({
    name: String,
    value: Number,
    currency: String,
    accountType: {type: ObjectId, ref: 'AccountType'},
    mainAccount: {type: ObjectId, ref: 'Account'},
    user: {type: ObjectId, ref: 'User'}

});

module.exports = mongoose.model('Account', Account);
