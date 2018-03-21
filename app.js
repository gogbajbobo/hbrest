const
    express         = require('express'),
    app             = express(),
    bodyParser      = require('body-parser'),
    mongoose        = require('mongoose'),
    requestLogger   = require('morgan'),
    log             = require(process.cwd() + '/libs/logger')(module),
    config          = require(process.cwd() + '/libs/config'),
    passport        = require(process.cwd() + '/libs/auth'),
    path            = require('path');

mongoose.connect(config.get('mongoose:uri'));
const db = mongoose.connection;

db.on('error', err => {
    log.error('connection error:', err.message);
});
db.once('open', () => {
    log.info("Connected to DB!");
});

app.use(requestLogger('dev'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(require('express-session')({
    secret: 'mouse dog',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

const authRoutes = require('./routes/authRoutes');
app.use(authRoutes);

const apiRoutes = require('./routes/apiRoutes');
// app.use('/api', passport.authenticate('local', { failureRedirect: '/login' }), dataRoutes);
app.use('/api', apiRoutes);

const defaultRoute = require('./routes/defaultRoute');
app.use(defaultRoute);

const port = process.env.PORT || config.get('port');
app.listen(port, () => {
    log.info('HomeBudget RESTful API server started on:', port);
});
