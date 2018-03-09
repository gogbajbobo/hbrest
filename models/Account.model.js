const
    knex = require('../db/knex'),
    Bookshelf = require('bookshelf')(knex),
    uuidv4 = require('uuid/v4');

const {AccountType} = require('./AccountType.model');
const {Transaction} = require('./Transaction.model');

const Account = Bookshelf.Model.extend({

    tableName: 'accounts',
    hasTimestamps: true,

    accountType: function () {
        return this.belongsTo(AccountType, 'accountType_id');
    },

    mainAccount: function () {
        return this.belongsTo(Account, 'mainAccount_id');
    },
    subaccounts: function () {
        return this.hasMany(Account, 'mainAccount_id');
    },

    outTransactions: function () {
        return this.hasMany(Transaction, 'fromAccount_id');
    },
    inTransactions: function () {
        return this.hasMany(Transaction, 'toAccount_id');
    }

}, {

    creationProperties: params => {
        return {
            xid: params.xid || uuidv4(),
            name: params.name,
            value: params.value,
            currency: params.currency,
            accountType_id: params.accountType_id
        };
    },
    updatingProperties: (params, object) => {
        return {
            xid: params.xid || object.get('xid'),
            name: params.name || object.get('name'),
            value: params.value || object.get('value'),
            currency: params.currency || object.get('currency'),
            accountType_id: params.accountType_id || object.get('accountType_id')
        };
    },
    logName: 'account'

});

const Accounts = Bookshelf.Collection.extend({
    model: Account
}, {
    logName: 'accounts',
    path: 'accounts'
});

module.exports = {
    objectModel: Account,
    collectionModel: Accounts
};
