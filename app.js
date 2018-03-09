const
    debug = require('debug')('hbrest:app'),
    express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    Schema = require('./db/schema'),
    _ = require('lodash');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const validator = require('./auth/validator');
app.use('/', validator);

const apiBaseUrl = '/api';
// routes files in ./routes should be named exactly as tables in Schema
_.forEach(_.keys(Schema), key => {
    app.use(apiBaseUrl, require('./routes/' + key)());
});

const port = process.env.PORT || 8888;

app.listen(port, () => {
    debug('HomeBudget RESTful API server started on: ' + port);
});
