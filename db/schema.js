const _ = require('lodash');

const foreignKey = {
    type: 'integer',
    unsigned: true,
    references: 'id'
};

const accountForeignKey = _.assign({}, foreignKey, {
    inTable: 'accounts'
});

const accountTypeForeignKey = _.assign({}, foreignKey, {
    inTable: 'accountTypes',
    nullable: false
});

const accountForeignKeyNullable = _.assign({}, accountForeignKey, {
    nullable: true
});

const accountForeignKeyNonnull = _.assign({}, accountForeignKey, {
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
        type: 'uuid',
        unique:true,
        index: true
    },
    ts: timestamp,
    created_at: _.assign({}, dateTime, {nullable: false}),
    updated_at: _.assign({}, dateTime, {nullable: true})
};

const AccountType = _.assign({}, Base, {
    type: {
        type: 'string',
        maxlength: 32,
        nullable: false,
        index: true
    }
});

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
    accountType_id: accountTypeForeignKey,
    mainAccount_id: accountForeignKeyNullable
});

const Transaction = _.assign({}, Base, {
    date: dateTime,
    fromValue: value,
    toValue: value,
    fromAccount_id: accountForeignKeyNonnull,
    toAccount_id: accountForeignKeyNonnull
});

const Schema = {
    accountTypes: AccountType,
    accounts: Account,
    transactions: Transaction
};

// _.forEach(Schema, (value, key) => {
//     console.log(key, _.keys(value));
// });

module.exports = Schema;