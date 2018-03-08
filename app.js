const knex = require('./db/knex');
const Bookshelf = require('bookshelf')(knex);

const bodyParser = require('body-parser');
const _ = require('lodash');
const debug = require('debug')('hbrest:app');

const express = require('express');
const app = express();
const router = express.Router();

const uuidv4 = require('uuid/v4');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const AccountType = Bookshelf.Model.extend({
    tableName: 'accountTypes'
});

const Account = Bookshelf.Model.extend({
    tableName: 'accounts'
});

const AccountTypes = Bookshelf.Collection.extend({
    model: AccountType
});

const Accounts = Bookshelf.Collection.extend({
    model: Account
});

router.route('/accountTypes')

    .get((req, res) => {

        AccountTypes.forge()
            .fetch()
            .then(collection => {
                res.json({error: false, data: collection.toJSON()});
            })
            .catch(err => {
                res.status(500).json({error: true, data: {message: err.message}});
            });
    })

    .post((req, res) => {

        AccountType.forge({
            type: req.body.type,
            xid: req.body.xid || uuidv4()
        })
            .save()
            .then(account => {
                res.json({error: false, data: account.toJSON()});
            })
            .catch(err => {
                res.status(500).json({error: true, data: {message: err.message}});
            });
    });

router.route('/accounts')

    .get((req, res) => {

        Accounts.forge()
            .fetch()
            .then(collection => {
                res.json({error: false, data: collection.toJSON()});
            })
            .catch(err => {
                res.status(500).json({error: true, data: {message: err.message}});
            });
    })

    .post((req, res) => {

        Account.forge({
            name: req.body.name,
            value: req.body.value,
            currency: req.body.currency,
            xid: req.body.xid || uuidv4(),
            accountType_id: req.body.accountType_id
        })
            .save()
            .then(account => {
                res.json({error: false, data: account.toJSON()});
            })
            .catch(err => {
                res.status(500).json({error: true, data: {message: err.message}});
            });
    });


app.use('/api', router);

const port = process.env.PORT || 8888;

app.listen(port, () => {
    debug('HomeBudget RESTful API server started on: ' + port);
});
