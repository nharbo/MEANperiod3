var connection = require('../db/db');
var objectId = require('mongodb').ObjectID;

function _allJokes(callback) {
    var db = connection.get();
    db.collection('jokes').find({}).toArray(function (err, result) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }

    });
}

function _findJoke(id, callback){
    var db = connection.get();
    db.collection('jokes').findOne({"_id" : id}, function (err, result){
        if(err){
            callback(err, null)
        } else {
            callback(null, result);
        }
    });
}

function _editJoke(joke, toUpdate, callback){
    var db = connection.get();
    db.collection('jokes').updateOne({"joke" : joke}, toUpdate, function (err, result){
        if(err){
            callback(err, null)
        } else {
            callback(null, result);
        }
    });
}

function _deleteJoke(id, callback){
    var db = connection.get();
    db.collection('jokes').deleteOne({"_id" : id}, function (err, result){
        if(err){
            callback(err, null)
        } else {
            callback(null, result);
        }
    });
}

exports.allJokes = _allJokes;
exports.findJoke = _findJoke;
exports.editJoke = _editJoke;
exports.deleteJoke = _deleteJoke;
exports.randomJoke;
