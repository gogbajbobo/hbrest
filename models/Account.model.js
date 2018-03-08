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
            name: params.name,
            value: params.value,
            currency: params.currency,
            xid: params.xid || uuidv4(),
            accountType_id: params.accountType_id
        };
    },
    updatingProperties: (params, object) => {
        return {
            name: params.name || object.get('name'),
            value: params.value || object.get('value'),
            currency: params.currency || object.get('currency'),
            xid: params.xid || object.get('xid'),
            accountType_id: params.accountType_id || object.get('accountType_id')
        };
    },
    logName: 'account'

});

const Accounts = Bookshelf.Collection.extend({
    model: Account
}, {
    logName: 'accounts'
});

module.exports = {Account, Accounts};
