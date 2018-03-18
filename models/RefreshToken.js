const {mongoose, Schema, ObjectId, Decimal128, AbstractBase, _} = require('../models/AbstractBase');

const RefreshToken = new Schema(
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

RefreshToken.static({
    apiPath: 'refreshTokens'
});

module.exports = mongoose.model('RefreshToken', RefreshToken);
