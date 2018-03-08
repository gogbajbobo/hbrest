const
    knex = require('../db/knex'),
    Bookshelf = require('bookshelf')(knex);

const AccountType = Bookshelf.Model.extend({
    tableName: 'accountTypes',
    hasTimestamps: true
});

const AccountTypes = Bookshelf.Collection.extend({
    model: AccountType
});

module.exports = {AccountType, AccountTypes};
