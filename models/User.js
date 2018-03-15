const
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');

const User = new Schema({
    username: String
});

User.static({
    apiPath: 'users'
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);
