const
    knex = require('../db/knex'),
    Bookshelf = require('bookshelf')(knex);

const {Account} = require('./Account.model');

const Transaction = Bookshelf.Model.extend({

    tableName: 'transactions',
    hasTimestamps: true,

    fromAccount: function () {
        return this.belongsTo(Transaction, 'fromAccount_id');
    },
    toAccount: function () {
        return this.belongsTo(Transaction, 'toAccount_id');
    }

});

const Transactions = Bookshelf.Collection.extend({
    model: Transaction
});

module.exports = {Transaction, Transactions};
