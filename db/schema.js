const _ = require('lodash');

const foreignKey = {
    type: 'integer',
    unsigned: true,
    references: 'id',
    inTable: 'accounts'
};

const foreignKeyNullable = _.assign({}, foreignKey, {
    nullable: true
});

const foreignKeyNonnull = _.assign({}, foreignKey, {
    nullable: false
});

const value = {
    type: 'decimal',
    nullable: false,
    defaultTo: 0,
    unsigned: false
};

const time = {
    nullable: false,
    index: true,
    defaultTo: 'now'
};

const dateTime = _.assign({}, time, {
    type: 'dateTime'
});

const timestamp = _.assign({}, time, {
    type: 'timestamp'
});

const Base = {
    id: {
        type: 'increments',
        nullable: false,
        primary: true
    },
    xid: {
        type: 'string',
        maxlength: 36,
        nullable: false,
        unique:true
    },
    ts: timestamp
};

const Account = _.assign({}, Base, {
    name: {
        type: 'string',
        maxlength: 128,
        nullable: false,
        index: true
    },
    value: value,
    currency: {
        type: 'string',
        maxlength: 10,
        nullable: false,
        index: true
    },
    type: {
        type: 'string',
        maxlength: 32,
        nullable: false,
        index: true
    },
    mainAccount_id: foreignKeyNullable
});

const Transaction = _.assign({}, Base, {
    date: dateTime,
    fromValue: value,
    toValue: value,
    fromAccount_id: foreignKeyNonnull,
    toAccount_id: foreignKeyNonnull
});

const Schema = {
    accounts: Account,
    transactions: Transaction
};

_.forEach(Schema, (value, key) => {
    console.log(key, _.keys(value));
});

module.exports = Schema;