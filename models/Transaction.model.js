const
    knex = require('../db/knex'),
    Bookshelf = require('bookshelf')(knex),
    uuidv4 = require('uuid/v4');

const {Account} = require('./Account.model');

const Transaction = Bookshelf.Model.extend({

    tableName: 'transactions',
    hasTimestamps: true,

    fromAccount: function () {
        return this.belongsTo(Account, 'fromAccount_id');
    },
    toAccount: function () {
        return this.belongsTo(Account, 'toAccount_id');
    }

}, {

    creationProperties: params => {
        return {
            xid: params.xid || uuidv4(),
            fromValue: params.fromValue,
            toValue: params.toValue,
            fromAccount_id: params.fromAccount_id,
            toAccount_id: params.toAccount_id
        };
    },
    updatingProperties: (params, object) => {
        return {
            xid: params.xid || object.get('xid'),
            fromValue: params.fromValue || object.get('fromValue'),
            toValue: params.toValue || object.get('toValue'),
            fromAccount_id: params.fromAccount_id || object.get('fromAccount_id'),
            toAccount_id: params.toAccount_id || object.get('toAccount_id')
        };
    },
    logName: 'transaction'

});

const Transactions = Bookshelf.Collection.extend({
    model: Transaction
}, {
    logName: 'transactions'
});

module.exports = {Transaction, Transactions};
