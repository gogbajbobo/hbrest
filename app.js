const knex = require('./knex');
const Bookshelf = require('bookshelf')(knex);

const bodyParser = require('body-parser');
const _ = require('lodash');
const debug = require('debug')('hbrest:app');

const express = require('express');
const app = express();
const router = express.Router();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const IncomeAccount = Bookshelf.Model.extend({
    tableName: 'incomeAccounts'
});

const IncomeAccounts = Bookshelf.Collection.extend({
    model: IncomeAccount
});

router.route('/incomeAccounts')

    .get(function (req, res) {

        IncomeAccounts.forge()
            .fetch()
            .then(function (collection) {
                res.json({error: false, data: collection.toJSON()});
            })
            .otherwise(function (err) {
                res.status(500).json({error: true, data: {message: err.message}});
            });
    })

    // create a user
    .post(function (req, res) {

        IncomeAccount.forge({
            name: req.body.name,
            value: req.body.value,
            currency: req.body.currency
        })
            .save()
            .then(function (account) {
                res.json({error: false, data: account.toJSON()});
            })
            .otherwise(function (err) {
                res.status(500).json({error: true, data: {message: err.message}});
            });
    });


app.use('/api', router);

const port = process.env.PORT || 8888;

app.listen(port, () => {
    debug('HomeBudget RESTful API server started on: ' + port);
});
