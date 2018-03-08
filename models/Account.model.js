const
    knex = require('../db/knex'),
    Bookshelf = require('bookshelf')(knex);

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

});

const Accounts = Bookshelf.Collection.extend({
    model: Account
});

module.exports = {Account, Accounts};
