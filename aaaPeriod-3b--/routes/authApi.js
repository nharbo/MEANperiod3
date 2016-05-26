var express = require('express');
var passport = require('passport');
var createSendToken = require('../config/jwt.js');
var facebookAuth = require('../config/strategies/facebook.strategy.js');
var emailVerification = require('../config/email.verification.js');
var authRouter = express.Router();


authRouter.route('/register').post(passport.authenticate('local-register'), function (req, res) {
    console.log("YOU ARE REGISTERED +++++++++++");
    emailVerification.send(req.user.email);
    //createSendToken(req.user, res);
});

authRouter.route('/login').post(passport.authenticate('local-login'), function (req, res) {
    console.log("req user: " + req.user);
    console.log("YOU ARE LOGGED IN +++++++++++");
    createSendToken(req.user, res);
});

authRouter.route('/auth/verifyEmail').get(emailVerification.handler);

authRouter.route('/auth/facebook').post(facebookAuth);






// ++++++ THIS IS NO LONGER NEEDED ++++++
authRouter.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});


authRouter.route('/profile')
    .all(function (req, res, next) {
        if (!req.user) {
            res.redirect('../..');
        } else {
            next();
        }
    })
    .get(function (req, res) { //Her skal der defineres den rigtige route til mainpage, når den kommer på.
        res.json(req.user); //her skal evt. fanges et id, hvis vi bruger mongodb.
    });
// ++++++ THIS IS NO LONGER NEEDED ++++++




module.exports = authRouter;
