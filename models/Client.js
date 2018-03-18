const {mongoose, Schema, ObjectId, Decimal128, AbstractBase, _} = require('../models/AbstractBase');

const Client = new Schema(
    _.assign({}, AbstractBase, {
        name: {
            type: String,
            unique: true,
            required: true
        },
        clientSecret: {
            type: String,
            required: true
        }
    })
);

Client.static({
    apiPath: 'clients'
});

module.exports = mongoose.model('Client', Client);
