const
    knex = require('../db/knex'),
    Bookshelf = require('bookshelf')(knex);

const {Account} = require('./Account.model');

const AccountType = Bookshelf.Model.extend({

    tableName: 'accountTypes',
    hasTimestamps: true,

    accounts: function () {
        return this.hasMany(Account, 'accountType_id');
    }

});

const AccountTypes = Bookshelf.Collection.extend({
    model: AccountType
});

module.exports = {AccountType, AccountTypes};
