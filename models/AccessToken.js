const {mongoose, Schema, ObjectId, Decimal128, AbstractBase, _} = require('../models/AbstractBase');

const AccessToken = new Schema(
    _.assign({}, AbstractBase, {
        user: {
            type: ObjectId,
            ref: 'User'
        },
        client: {
            type: ObjectId,
            ref: 'Client'
        },
        token: {
            type: String,
            unique: true,
            required: true
        }
    })
);

AccessToken.static({
    apiPath: 'accessTokens'
});

module.exports = mongoose.model('AccessToken', AccessToken);
