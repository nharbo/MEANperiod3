var express = require('express');
var router = express.Router();
var jokes = require('../model/jokesFacade');

//Get all jokes
router.get('/jokes', function (req, res) {
    jokes.allJokes(function (err, data) {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
});

//Get 1 joke
router.get('/joke/:_id', function (req, res) {
    jokes.findJoke(req.params._id, function (err, data) {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
});

//Add new joke
router.post('/addjoke', function (req, res) {
    jokes.addJoke(req.body, function (err, data) { //Joken er med i body.
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
});

//Update existing joke
router.put('/edit/:_id', function (req, res) {
    jokes.editJoke(req.params._id, req.body.newjoke, function (err, data) { //den eksisterende jokes id, samt den ny tekst skal med i body
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
});

//Delete joke
router.delete('/delete/:_id', function (req, res) {
    jokes.deleteJoke(req.params._id, function (err, data) {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
});

module.exports = router;
