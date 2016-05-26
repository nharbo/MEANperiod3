var config = require('./config.js');
var _ = require('underscore');
var fs = require('fs');
var jwt = require('jwt-simple');
var nodemailer = require('nodemailer');
var User = require('../model/userSchema.js');

var model = {
    verifyUrl: 'http:localhost:3000/auth/verifyEmail?token=',
    title: 'Angular Seed Demo',
    subTitle: 'Thanks for signing up',
    body: 'Please, verify your email address by clicking the button below'
};

// This creates the html mail and sends it
exports.send = function (email) {
    var payload = {
        sub: email,
        exp: moment().add(7, 'days').unix()
    };

    var token = jwt.encode(payload, config.EMAIL_SECRET);

    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'your_gmail_here',
            pass: 'your_pass_here'
        }
    });

    var mailOptions = {
        from: 'emil.gras@gmail.com',
        to: email + ', emil.gras@gmail.com', // Add your own email here
        subject: 'Emils Test App',
        html: getHtml(token)
    };

    transporter.sendMail(mailOptions, function (err, info) {
        if (err)
            console.log("Err: " + err);//return res.status(500, err);

        console.log('Mail sent');
    });
};


// This is the handler when a user clicks the email verification link
exports.handler = function (req, res) {
    var token = req.query.token;

    var payload = jwt.decode(token, config.EMAIL_SECRET);

    var email = payload.sub;

    if (!email) return handleError(res);

    User.findOne({email: email}, function (err, foundUser) {
        if (err) return res.status(500);

        if (!foundUser) return handleError();

        if (!foundUser.active)
            foundUser.active = true;

        foundUser.save(function(err) {
            if (err) return res.status(500);

            console.log("verify handler - is active= " + foundUser.active);
            return res.redirect(config.APP_URL);
        });
    });
};


function getHtml(token) {
    var path = './views/emailVerification.html';
    var html = fs.readFileSync(path, encoding = 'utf-8'); // OBS in production better use Async

    var template = _.template(html);

    model.verifyUrl += token;

    return template(model);
};

function handleError(res) {
    return res.status(401).send({
        message: 'Authentication failed, unable to to verify email'
    })
}

_.templateSettings = {
    interpolate: /\{\{(.+?)\}\}/g
};
