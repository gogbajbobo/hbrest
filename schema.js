const _ = require('lodash');

const foreignKey = {
    type: 'integer',
    nullable: true,
    unsigned: true
};

const Account = {
    name: {
        type: 'string',
        maxlength: 254,
        nullable: false,
        unique: true
    },
    value: {
        type: 'decimal',
        nullable: false,
        unsigned: false
    },
    currency: {
        type: 'string',
        maxlength: 10,
        nullable: false
    }
};

const IncomeAccount = Account;
const ActiveAccount = Account;
const ExpenseAccount = Account;

const SubAccount = _.assign(Account, {
    mainAccount_id: foreignKey
});

const Transaction = {
    date: {
        type: 'dateTime',
        nullable: false
    },
    fromValue: {
        type: 'decimal',
        nullable: false,
        unsigned: false
    },
    toValue: {
        type: 'decimal',
        nullable: false,
        unsigned: false
    },
    fromAccount_id: foreignKey,
    toAccount_id: foreignKey
};

const Schema = {
    incomeAccounts: IncomeAccount,
    activeAccounts: ActiveAccount,
    expenseAccounts: ExpenseAccount,
    subAccounts: SubAccount,
    transactions: Transaction
};

// console.log(Schema);

module.exports = Schema;