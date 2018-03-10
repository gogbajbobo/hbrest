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

const userForeignKey = _.assign({}, foreignKey, {
    inTable: 'users',
    nullable: false
});

const moneyValue = {
    type: 'moneyDecimal',
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

const User = _.assign({}, Base, {
    login: {
        type: 'string',
        maxlength: 128,
        nullable: false,
        unique:true,
        index: true
    },
    hash: {
        type: 'string',
        maxlength: 128,
        nullable: false
    }
});

const Token = _.assign({}, Base, {
    token: {
        type: 'string',
        maxlength: 128,
        nullable: false
    },
    user_id: userForeignKey
});

const AccountType = _.assign({}, Base, {
    type: {
        type: 'string',
        maxlength: 32,
        nullable: false,
        index: true
    },
    user_id: userForeignKey
});

const Account = _.assign({}, Base, {
    name: {
        type: 'string',
        maxlength: 128,
        nullable: false,
        index: true
    },
    value: moneyValue,
    currency: {
        type: 'string',
        maxlength: 10,
        nullable: false,
        index: true
    },
    accountType_id: accountTypeForeignKey,
    mainAccount_id: accountForeignKeyNullable,
    user_id: userForeignKey
});

const Transaction = _.assign({}, Base, {
    date: dateTime,
    fromValue: moneyValue,
    toValue: moneyValue,
    fromAccount_id: accountForeignKeyNonnull,
    toAccount_id: accountForeignKeyNonnull,
    user_id: userForeignKey
});

const Schema = {
    users: User,
    tokens: Token,
    accountTypes: AccountType,
    accounts: Account,
    transactions: Transaction
};

// _.forEach(Schema, (value, key) => {
//     console.log(key, _.keys(value));
// });

module.exports = Schema;