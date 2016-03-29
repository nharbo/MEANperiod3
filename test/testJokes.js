var expect = require('chai').expect;
var jokes = require('../model/jokesFacade');
var connection = require('../db/db');
var objectId = require('mongodb').ObjectID;

var testJokes = [
    {
        "_id": new objectId("110987654321"),
        "joke": "AAA",
        "type": ["short", "alcohol", "quote"],
        "reference": {"author": "Someone", "link": ""},
        "lastEdited": new Date()
    },
    {
        "_id": new objectId("111234567890"),
        "joke": "BBB",
        "type": ["short", "alcohol", "quote"],
        "reference": {"author": "Someone", "link": ""},
        "lastEdited": new Date()
    }
];

describe('This tests the jokes factory', function () {

    before(function (done) {
        connection.connect("mongodb://localhost:27017/test", function () {
            done();
        });
    });

    beforeEach(function (done) {
        var db = connection.get();
        db.collection('jokes').deleteMany({}, function (err, data) {
            if (err) {
                throw new Error(err);
            }
            db.collection('jokes').insertMany(testJokes, function (err, data) {
                if (err) {
                    throw new Error(err);
                }
                done();
            });
        })
    });

    it("should find 2 jokes", function (done) {
        jokes.allJokes(function (err, data) {
            expect(data.length).to.be.equal(2);
            done();
        })
    });

    it("should find 1 joke by id", function (done) {

        var jokeid = new objectId("111234567890");

            jokes.findJoke(jokeid, function (err, data) {
                expect(data._id).to.be.eql(objectId(jokeid));
                done();
            })
        })


    });

    it("should edit a joke", function (done) {
        var toUpdate = {$set: {"joke": "I'm edited"}, $addToSet: {"type": "replaced"}}; //Forstår ikke det med id'et.. Den ændre jo ikke noget? Kun noget fiktivt..
        var joke = "AAA";

        jokes.editJoke(joke, toUpdate, function (err, data) {
            console.log("Data: " + data);
            expect(data).to.be.ok;
            done();
        })
    });

    it("should delete a joke", function (done) {
        var jokeid = 1;

        jokes.allJokes(function (err, data) {
            var id = JSON.stringify(data[0]._id);

            jokes.deleteJoke(id, function (err, data) {
                console.log("Data: " + data);
                expect(data).to.be.ok;
                done();
            })
        });
});