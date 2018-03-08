const
    knex = require('../db/knex'),
    Bookshelf = require('bookshelf')(knex);

const Account = Bookshelf.Model.extend({
    tableName: 'accounts',
    hasTimestamps: true
});

const Accounts = Bookshelf.Collection.extend({
    model: Account
});

module.exports = {Account, Accounts};
