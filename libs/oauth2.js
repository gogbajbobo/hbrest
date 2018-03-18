const
    oauth2orize         = require('oauth2orize'),
    passport            = require('passport'),
    crypto              = require('crypto'),
    config              = require('./config'),
    User                = require('../models/User'),
    Client              = require('../models/Client'),
    AccessToken         = require('../models/AccessToken'),
    RefreshToken        = require('../models/RefreshToken');

// create OAuth 2.0 server

const server = oauth2orize.createServer();


// Exchange username & password for an access token.

server.exchange(oauth2orize.exchange.password((client, username, password, scope, done) => {

    User.findOne({ username: username }, (err, user) => {

        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        if (!user.checkPassword(password)) { return done(null, false); }

        RefreshToken.remove({ userId: user.userId, clientId: client.clientId }, err => {
            if (err) return done(err);
        });
        AccessToken.remove({ userId: user.userId, clientId: client.clientId }, err => {
            if (err) return done(err);
        });

        const tokenValue = crypto.randomBytes(32).toString('hex');
        const refreshTokenValue = crypto.randomBytes(32).toString('hex');
        const token = new AccessToken({ token: tokenValue, clientId: client.clientId, userId: user.userId });
        const refreshToken = new RefreshToken({ token: refreshTokenValue, clientId: client.clientId, userId: user.userId });

        refreshToken.save(err => {
            if (err) { return done(err); }
        });

        const info = { scope: '*' };
        token.save((err, token) => {

            if (err) { return done(err); }
            done(null, tokenValue, refreshTokenValue, { 'expires_in': config.get('security:tokenLife') });

        });

    });

}));


// Exchange refreshToken for an access token.

server.exchange(oauth2orize.exchange.refreshToken((client, refreshToken, scope, done) => {

    RefreshToken.findOne({ token: refreshToken }, (err, token) => {

        if (err) { return done(err); }
        if (!token) { return done(null, false); }
        if (!token) { return done(null, false); }

        User.findById(token.userId, (err, user) => {

            if (err) { return done(err); }
            if (!user) { return done(null, false); }

            RefreshToken.remove({ userId: user.userId, clientId: client.clientId }, err => {
                if (err) return done(err);
            });
            AccessToken.remove({ userId: user.userId, clientId: client.clientId }, err => {
                if (err) return done(err);
            });

            const tokenValue = crypto.randomBytes(32).toString('hex');
            const refreshTokenValue = crypto.randomBytes(32).toString('hex');
            const token = new AccessToken({ token: tokenValue, clientId: client.clientId, userId: user.userId });
            const refreshToken = new RefreshToken({ token: refreshTokenValue, clientId: client.clientId, userId: user.userId });

            refreshToken.save(err => {
                if (err) { return done(err); }
            });

            const info = { scope: '*' }
            token.save((err, token) => {

                if (err) { return done(err); }
                done(null, tokenValue, refreshTokenValue, { 'expires_in': config.get('security:tokenLife') });

            });

        });

    });

}));


// token endpoint

module.exports.token = [
    passport.authenticate(['basic', 'oauth2-client-password'], { session: false }),
    server.token(),
    server.errorHandler()
];
