const
    debug = require('debug')('hbrest:app'),
    express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    User = require('./models/User'),
    logger = require('morgan');

mongoose.connect('mongodb://localhost/hbrest');

app.use(logger('dev'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const routes = require('./routes/routes');
app.use('/api', routes);

const defaultRoute = require('./routes/defaultRoute');
app.use(defaultRoute);

const port = process.env.PORT || 8888;
app.listen(port, () => {
    debug('HomeBudget RESTful API server started on: ' + port);
});
