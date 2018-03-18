const
    express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    User = require('./models/User'),
    requestLogger = require('morgan'),
    log = require('./logger')(module);

mongoose.connect('mongodb://localhost/hbrest');

app.use(requestLogger('dev'));

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
    log.info('HomeBudget RESTful API server started on:', port);
});
