const
    passport                = require('passport'),
    LocalStrategy           = require('passport-local').Strategy,
    User                    = require(process.cwd() + '/models/User');

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

module.exports = passport;