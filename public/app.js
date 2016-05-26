var app = angular.module("myApp", []);


app.controller('jokeController', function ($http) {
    var self = this;

    self.message = "hi";


    function getAll() {
        $http({
            method: 'GET',
            url: '/api/jokes'
        }).then(function successCallback(response) {
            self.jokes = response.data;
        }, function errorCallback(response) {
        });
    };

    self.getRandom = function () {
        $http({
            method: 'GET',
            url: '/api/random'
        }).then(function successCallback(response) {
            self.output = response.data.joke;
        }, function errorCallback(response) {
        });
    };

    self.editJokeHTTP = function () {

        var data = {
            newjoke: self.input
        };

        $http({
            method: 'PUT',
            data: angular.toJson(data),
            url: '/api/edit/' + self.idToEdit
        }).then(function successCallback(response) {
            self.input = "";
            self.output = "Joke updated";
            getAll();
        }, function errorCallback(response) {
        });
    }

    self.editJoke = function (joke, id) {
        self.input = joke; //input laves til den joke vi har trykket edit på.
        console.log("Id to edit: "+id);
        self.idToEdit = id
    };

    self.addJoke = function () {

        var data = {
            joke: self.input,
            lastEdited: new Date
        };

        $http({
            method: 'POST',
            data: angular.toJson(data),
            url: '/api/addjoke'
        }).then(function successCallback(response) {
            self.input = "";
            self.output = "Joke added";
            getAll();
        }, function errorCallback(response) {
        });
    };

    self.deleteJoke = function (id) {
        console.log(id);
        $http({
            method: 'DELETE',
            url: '/api/delete/' + id
        }).then(function successCallback(response) {
            self.output = "Joke was deleted";
            getAll();
        }, function errorCallback(response) {
        });
    };


    getAll();


});