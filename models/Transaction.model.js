const
    knex = require('../db/knex'),
    Bookshelf = require('bookshelf')(knex);

const Transaction = Bookshelf.Model.extend({
    tableName: 'transactions',
    hasTimestamps: true
});

const Transactions = Bookshelf.Collection.extend({
    model: Transaction
});

module.exports = {Transaction, Transactions};
