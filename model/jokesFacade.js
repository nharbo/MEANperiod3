var connection = require('../db/db'); //Her er forbindelsen til databasen, den tjekker om vi har forbindelse eller skal lave en ny.
var ObjectId = require('mongodb').ObjectID; //Bruges til at lave nye objectID'er med.


function _allJokes(callback) {
    var db = connection.get();
    db.collection('jokes').find({}).toArray(function (err, result) { //finder alle, og returnerer et array
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }

    });
}

function _findJoke(id, callback) {
    var db = connection.get();
    db.collection('jokes').findOne({"_id": new ObjectId(id)}, function (err, result) { //finder en enkelt
        if (err) {
            callback(err, null)
        } else {
            callback(null, result);
        }
    });
}

function _addJoke(jokeToAdd, callback) {
    var db = connection.get();
    db.collection("jokes").insert(jokeToAdd, function (err, data) { //tilføjer
        if (err) {
            callback(err);
        } else {
            callback(null, data);
        }
    });
}

function _editJoke(id, newJoke, callback) {
    var db = connection.get();
    db.collection("jokes").updateOne({"_id": new ObjectId(id)},
        {$set: {
                "joke": newJoke,
                "lastEdited": new Date()
            }
        },
        function (err, data) {
            if (err) {
                callback(err);
            } else {
                callback(null, data);
            }
        });
}

function _deleteJoke(id, callback) {
    var db = connection.get();
    db.collection('jokes').deleteOne({"_id": new ObjectId(id)}, function (err, result) { //sletter et dokument.
        if (err) {
            callback(err, null)
        } else {
            callback(null, result);
        }
    });
}

exports.allJokes = _allJokes;
exports.findJoke = _findJoke;
exports.editJoke = _editJoke;
exports.addJoke = _addJoke;
exports.deleteJoke = _deleteJoke;
exports.randomJoke;
