const
    knex = require('../db/knex'),
    Bookshelf = require('bookshelf')(knex),
    uuidv4 = require('uuid/v4');

const
    {Account} = require('./Account.model'),
    {User} = require('./User.model');

const AccountType = Bookshelf.Model.extend({

    tableName: 'accountTypes',
    hasTimestamps: true,

    accounts: function () {
        return this.hasMany(Account, 'accountType_id');
    },
    user: function () {
        return this.belongsTo(User, 'user_id');
    }

}, {

    creationProperties: params => {
        return {
            xid: params.xid || uuidv4(),
            type: params.type,
        };
    },
    updatingProperties: (params, object) => {
        return {
            xid: params.xid || object.get('xid'),
            type: params.type || object.get('type')
        };
    },
    logName: 'accountType'

});

const AccountTypes = Bookshelf.Collection.extend({
    model: AccountType
}, {
    logName: 'accountTypes',
    path: 'accountTypes'
});

module.exports = {
    objectModel: AccountType,
    collectionModel: AccountTypes
};
