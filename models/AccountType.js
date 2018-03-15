const
    mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const ObjectId = Schema.Types.ObjectId;

const AccountType = new Schema({
    name: String,
    user: {type: ObjectId, ref: 'User'},
    accounts: [{type: ObjectId, ref: 'Account'}]
});

AccountType.static({
    apiPath: 'accountTypes'
});

module.exports = mongoose.model('AccountType', AccountType);
