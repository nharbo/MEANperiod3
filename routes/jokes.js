var jokes = require('../model/jokesFacade');
var connection = require('../db/db');

connection.connect("mongodb://localhost:27017/test", function () {
    jokes.allJokes(function(err, data){
        if(err){
            console.log("Error: " + err);
        } else {
            console.log(data);
        }
    });
});

