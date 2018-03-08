const
    debug = require('debug')('hbrest:app'),
    express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const
    apiBaseUrl = '/api',
    accountTypeRoutes = require('./routes/accountTypes'),
    accountRoutes = require('./routes/accounts');

app.use(apiBaseUrl, accountTypeRoutes());
app.use(apiBaseUrl, accountRoutes());

const port = process.env.PORT || 8888;

app.listen(port, () => {
    debug('HomeBudget RESTful API server started on: ' + port);
});
