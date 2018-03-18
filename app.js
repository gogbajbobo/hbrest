const
    express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    User = require('./models/User'),
    requestLogger = require('morgan'),
    log = require('./libs/logger')(module),
    config = require('./libs/config');

mongoose.connect(config.get('mongoose:uri'));
const db = mongoose.connection;

db.on('error', err => {
    log.error('connection error:', err.message);
});
db.once('open', () => {
    log.info("Connected to DB!");
});

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

const port = process.env.PORT || config.get('port');
app.listen(port, () => {
    log.info('HomeBudget RESTful API server started on:', port);
});
