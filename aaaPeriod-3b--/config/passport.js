var passport = require('passport');
var localStrategy = require('./strategies/local.strategy.js');


module.exports = function (app) { //Dette eksporteres når filen kaldes.
    app.use(passport.initialize());

    passport.serializeUser(function (user, done) {
        console.log("User from login: " + user);
        done(null, user);
    });

    passport.deserializeUser(function (user, done) {
        done(null, user);
    });

    passport.use('local-login', localStrategy.login);
    passport.use('local-register', localStrategy.register);
};
