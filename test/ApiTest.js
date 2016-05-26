var expect = require('chai').expect;
var request = require('request');
var ObjectId = require('mongodb').ObjectID;


describe('Joke rest api test', function () {
    it('should get an array of all jokes in our database', function (done) {
        request({
            url: 'http://localhost:3000/api/jokes',
            method: 'GET',
            json: true
        }, function (err, res, body) {
            if (err) {
                throw new Error(err);
            }
            expect(body).to.have.lengthOf(3);
            done();
        });
    });
    it('should get a random joke', function (done) {
        request({
            url: 'http://localhost:3000/api/random',
            method: 'GET',
            json: true
        }, function (err, res, body) {
            if (err) {
                throw new Error(err);
            }
            expect(body).to.have.ownProperty('joke');
            done();
        });
    });
    it('should delete a joke', function (done) {
        var jokeId = "5746d98485a41e730b99c999";
        request({
            url: 'http://localhost:3000/api/delete/' + jokeId,
            method: 'DELETE',
            json: true
        }, function (err, res, body) {
            if (err) {
                throw new Error(err);
            }
            //console.log(res);
            expect(body.ok).to.equal(1);
            done();
        });
    });
    it('should add a joke', function (done) {
        var jokeToBeAdded = {
            "_id": new ObjectId("5746d98485a41e730b99c999"), //fast id, så vi kan slette og oprette igen på samme id.
            "joke": "This a new joke",
            "lastEdited": new Date
        };
        request({
            url: 'http://localhost:3000/api/addjoke/',
            method: 'POST',
            body: jokeToBeAdded,
            json: true
        }, function (err, res, body) {
            if (err) {
                throw new Error(err);
            }
            expect(body.op.joke).to.equal(jokeToBeAdded.joke);
            done();
        });
    });

    it('should edit a joke', function (done) {
        var idToEdit = "5746d98485a41e730b32c939";
        var jokeToBeAdded = {
            "newjoke": "This is an edited joke"
        };
        request({
            url: 'http://localhost:3000/api/edit/' + idToEdit,
            method: 'PUT',
            body: jokeToBeAdded,
            json: true
        }, function (err, res, body) {
            if (err) {
                throw new Error(err);
            }
            expect(body.nModified).to.equal(1);
            done();
        });
    });


});