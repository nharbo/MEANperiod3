var mongoose = require('mongoose');

var connection = mongoose.connect('mongodb://testuser:test@ds013579.mlab.com:13579/blogtestdb', function(err){
    if(err){
        console.log("Failed to connect to db! ----- " + err);
    } else {
        console.log("Connected to db!");

    }
});

exports.connection = connection;