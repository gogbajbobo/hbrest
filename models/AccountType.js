const {mongoose, Schema, ObjectId, Decimal128, AbstractBase, _} = require('../models/AbstractBase');

const AccountType = new Schema(
    _.assign({}, AbstractBase, {
        name: String,
        user: {type: ObjectId, ref: 'User'},
        accounts: [{type: ObjectId, ref: 'Account'}]
    })
);

AccountType.static({
    apiPath: 'accountTypes'
});

module.exports = mongoose.model('AccountType', AccountType);
