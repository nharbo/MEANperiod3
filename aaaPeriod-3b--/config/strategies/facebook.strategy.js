var request = require('request');
var qs = require('querystring');
var createSendToken = require('../jwt.js');
var config = require('../config.js');
var User = require('../../model/userSchema.js');


module.exports = function (req, res) {
    var accessTokenUrl = 'https://graph.facebook.com/oauth/access_token';
    var graphApiUrl = 'https://graph.facebook.com/me';

    var params = {
        clientId: req.body.clientId,
        redirect_uri: req.body.redirectUri,
        client_secret: config.FACEBOOK_SECRET,
        code: req.body.code
    };

    request.get({
        url: accessTokenUrl,
        qs: params
    }, function (err, response, accesToken) {
        accesToken = qs.parse(accesToken);

        request.get({
            url: graphApiUrl,
            qs: accesToken,
            json: true
        }, function (err, response, profile) {
            User.findOne({
                facebookId: profile.id
            }, function (err, foundUser) {
                if (foundUser)
                    return createSendToken(foundUser, res);

                var newUser = new User();
                newUser.facebookId = profile.id;
                newUser.displayName = profile.name;
                newUser.save(function (err) {
                    createSendToken(newUser, res);
                });
            })
        });
    });
};
