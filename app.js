const
    debug = require('debug')('hbrest:app'),
    express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

const authRedirect = require('./auth/auth');
app.use('/auth', authRedirect);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const validator = require('./auth/validator');
app.use(validator);

const apiBasePath = '/api';
app.use(apiBasePath, require('./routes/dataRoutes')());

const {defaultRoute} = require('./routes/defaultRoute');
app.use(defaultRoute);

const port = process.env.PORT || 8888;
app.listen(port, () => {
    debug('HomeBudget RESTful API server started on: ' + port);
});
