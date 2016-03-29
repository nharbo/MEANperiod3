# MEANperiod3

#Explain, generally, what is meant by a NoSQL database.

#Explain Pros & Cons in using a NoSQL database like MongoDB as your data store, compared to a traditional Relational SQL Database like MySQL.
-

#Explain how databases like MongoDB and redis would be classified in the NoSQL world 
- This is a hard question to answer. 

#Explain reasons to add a layer like Mongoose, on top on of a schema-less database like MongoDB
- It simplifies things a lot. Adds ORM to MongoDB

#Explain, using relevant examples, the strategy for querying MongoDB (all CRUD operations)

#Demonstrate, using a REST-API, how to perform all CRUD operations on a MongoDB
- I've done this in a different project - but here's the code:

var express = require('express');
var router = express.Router();

var Blog = require('../model/blogpostSchema');

router.post('/newpost', function (req, res, next) {

    var newBlogpost = new Blog(req.body);

    newBlogpost.save(function (err, doc) {
        if (err) {
            console.log(err);
        } else {
            res.send(req.body);
            console.log("blogpost added! - " + doc);
        }
    });
});

router.get('/myposts/:username', function (req, res, next) {
    Blog.find({'author': req.params.username, 'draft': false}, req.body, {upsert: true}, function (err, doc) {
        if (err) {
            console.log(err);
        } else {
            console.log("blogposts loaded");
            console.log(JSON.stringify(doc));
            res.send(JSON.stringify(doc));
        }
    });
});

router.get('/mydrafts/:username', function (req, res, next) {
    Blog.find({'author': req.params.username, 'draft': true}, req.body, {upsert: true}, function (err, doc) {
        if (err) {
            console.log(err);
        } else {
            console.log("drafts loaded");
            console.log(JSON.stringify(doc));
            res.send(JSON.stringify(doc));
        }
    });
});

router.get('/delete/:username/:title', function (req, res, next) {
    Blog.findOneAndRemove({'author': req.params.username, 'title': req.params.title}, function (err, doc) {
        if (err) {
            console.log(err);
        } else {
            console.log("post deleted!");
            res.send("Post deleted!");
        }
    });
});

router.get('/makepublic/:username/:title', function (req, res, next) {
    Blog.findOneAndUpdate({'author': req.params.username, 'title': req.params.title}, {$set:{draft: false}}, function (err, doc) {
        if (err) {
            console.log(err);
        } else {
            console.log("post public!");
            res.send("Post now public!");
        }
    });
});


module.exports = router;


#Explain the benefits from using Mongoose, and provide an example involving all CRUD operations

#Explain how redis "fits" into the NoSQL world, and provide an example of how to use it.

#Explain, using a relevant example, how redis (or a similar) can increase scalability (drastic) for a server using server side sessions
- Takes the session object  away from server and puts it into a database. Makes it easier to load balance it. Usually sessions are stored on the server. But being in a database, it doesnt matter what server that responds on your request. And not losing the session, because it is on a seperate database. 

#Explain, using a relevant example, a full MEAN application including relevant test cases to test the REST-API (not on the production database)
