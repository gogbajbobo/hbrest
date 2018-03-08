const
    knex = require('../db/knex'),
    Bookshelf = require('bookshelf')(knex),
    uuidv4 = require('uuid/v4');

const {Account} = require('./Account.model');

const AccountType = Bookshelf.Model.extend({

    tableName: 'accountTypes',
    hasTimestamps: true,

    accounts: function () {
        return this.hasMany(Account, 'accountType_id');
    }

}, {

    creationProperties: params => {
        return {
            type: params.type,
            xid: params.xid || uuidv4()
        };
    },
    updatingProperties: (params, object) => {
        return {
            type: params.type || object.get('type')
        };
    },
    logName: 'accountType'

});

const AccountTypes = Bookshelf.Collection.extend({
    model: AccountType
}, {
    logName: 'accountTypes'
});

module.exports = {AccountType, AccountTypes};
