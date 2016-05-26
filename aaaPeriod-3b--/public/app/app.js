var app = angular.module("myApp", []);


app.controller('jokeController', function ($http) {
    var _this = this;

    _this.message = "hi";


    function getAll() {
        $http({
            method: 'GET',
            url: '/api/jokes'
        }).then(function successCallback(response) {
            _this.jokes = response.data;
        }, function errorCallback(response) {
        });
    };

    _this.getRandom = function () {
        $http({
            method: 'GET',
            url: '/api/joke/random'
        }).then(function successCallback(response) {
            _this.output = response.data;
        }, function errorCallback(response) {
        });
    };

    _this.editJokeHTTP = function () {
        $http({
            method: 'PUT',
            data: _this.input,
            url: '/api/joke'
        }).then(function successCallback(response) {
            _this.input = "";
            _this.output = "Joke updated"
            getAll();
        }, function errorCallback(response) {
        });
    }

    _this.editJoke = function (index) {
        _this.input = JSON.stringify(_this.jokes[index]);
    };

    _this.addJoke = function () {
        $http({
            method: 'POST',
            data: _this.input,
            url: '/api/joke'
        }).then(function successCallback(response) {
            _this.input = "";
            _this.output = "Joke added";
            getAll();
        }, function errorCallback(response) {
        });
    };

    _this.deleteJoke = function (id) {
        console.log('In delete');
        console.log(id);
        $http({
            method: 'DELETE',
            url: '/api/joke/' + id
        }).then(function successCallback(response) {
            _this.output = "Joke was deleted";
            getAll();
        }, function errorCallback(response) {
        });
    };


    getAll();


});