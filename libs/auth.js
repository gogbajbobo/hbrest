const
    express         = require('express'),
    app             = express(),
    config                  = require('./config'),
    passport                = require('passport'),
    LocalStrategy           = require('passport-local').Strategy,
    BasicStrategy           = require('passport-http').BasicStrategy,
    ClientPasswordStrategy  = require('passport-oauth2-client-password').Strategy,
    BearerStrategy          = require('passport-http-bearer').Strategy,
    User                    = require('../models/User'),
    Client                  = require('../models/Client'),
    AccessToken             = require('../models/AccessToken'),
    RefreshToken            = require('../models/RefreshToken');

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

passport.use(new BasicStrategy(

    (username, password, done) => {

        Client.findOne({ clientId: username }, (err, client) => {

            if (err) { return done(err); }
            if (!client) { return done(null, false); }
            if (client.clientSecret !== password) { return done(null, false); }

            return done(null, client);

        });

    }

));

passport.use(new ClientPasswordStrategy(

    (clientId, clientSecret, done) => {

        Client.findOne({ clientId: clientId }, (err, client) => {

            if (err) { return done(err); }
            if (!client) { return done(null, false); }
            if (client.clientSecret !== clientSecret) { return done(null, false); }

            return done(null, client);

        });

    }

));

passport.use(new BearerStrategy(

    (accessToken, done) => {

        AccessToken.findOne({ token: accessToken }, (err, token) => {

            if (err) { return done(err); }
            if (!token) { return done(null, false); }

            if( Math.round((Date.now()-token.created)/1000) > config.get('security:tokenLife') ) {
                AccessToken.remove({ token: accessToken }, function (err) {
                    if (err) return done(err);
                });
                return done(null, false, { message: 'Token expired' });
            }

            User.findById(token.userId, function(err, user) {
                if (err) { return done(err); }
                if (!user) { return done(null, false, { message: 'Unknown user' }); }

                const info = { scope: '*' }
                done(null, user, info);
            });

        });

    }

));

module.exports = passport;