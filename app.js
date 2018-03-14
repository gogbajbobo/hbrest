const
    debug = require('debug')('hbrest:app'),
    express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    User = require('./models/User');

mongoose.connect('mongodb://localhost/hbrest');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const userRoute = require('./routes/user');

app.use('/api', userRoute);

const port = process.env.PORT || 8888;
app.listen(port, () => {
    debug('HomeBudget RESTful API server started on: ' + port);
});
