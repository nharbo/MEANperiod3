var express = require('express');
var router = express.Router();
var client = require('../db/redis').client;

//Henter alle keys ind fra redis databasen og smider dem i et array
function getValuesArray(callback) {
    var vs = [];

    client.keys("*", function (err, keys) {
        if (err) {
            throw err;
        }
        keys.forEach(function (key, i) {
            client.get(key, function (err, value) {
                value = JSON.parse(value);
                vs.push(value);
                console.log("Added: " + value.user.name);
                if (i == keys.length - 1)
                    callback(vs);
            });
        });
    });
};

router.get('/', function (req, res, next) {
    //Sender arrayet til index (handlebars), som looper det. Her kan vi se alle brugere som er online.
    getValuesArray(function (values) {
        res.render('index', {title: 'Redis Session admin page', sessions: values});
    });

});

router.get('/session/set/:name/:email', function (req, res) {
    console.log("name: " + req.params.name);
    console.log("email: " + req.params.email);
    var user = {name: req.params.name, email: req.params.email};
    req.session.user = user; //Vi opretter en user-attribut på session objektet, og sætter det lig med den nye user.
    res.send('session written to Redis siccessfully: ' + JSON.stringify(req.session.user));
});

router.get('/session/get', function (req, res) {
    console.log(req.session.user);
    if (req.session.user) {
        res.send('Session value stored in Redis: ' + JSON.stringify(req.session.user));
    } else {
        res.send('No session value stored in Redis!')
    }
});

module.exports = router;
