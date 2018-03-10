const
    knex = require('../db/knex'),
    Bookshelf = require('bookshelf')(knex),
    uuidv4 = require('uuid/v4');

const
    {Account} = require('./Account.model'),
    {AccountType} = require('./AccountType.model'),
    {Transaction} = require('./Transaction.model');

const User = Bookshelf.Model.extend({

    tableName: 'users',
    hasTimestamps: true,

    accountTypes: function () {
        return this.hasMany(AccountType, 'user_id');
    },
    accounts: function () {
        return this.hasMany(Account, 'user_id');
    },
    transactions: function () {
        return this.hasMany(Transaction, 'user_id');
    }

}, {

    creationProperties: params => {
        return {
            xid: params.xid || uuidv4()
        };
    },
    updatingProperties: (params, object) => {
        return {
            xid: params.xid || object.get('xid')
        };
    },
    logName: 'user'

});

const Users = Bookshelf.Collection.extend({
    model: User
}, {
    logName: 'users',
    path: 'users'
});

module.exports = {
    objectModel: User,
    collectionModel: Users
};
