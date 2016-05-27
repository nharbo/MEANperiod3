var express = require('express');
var router = express.Router();

var Blog = require('../model/blogpostSchema'); //HER kan du skrive kun til "blogpost" skemaet i db, i stedet for collection(Jokes fx).save

//Post
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

//Get
router.get('/myposts/:username', function (req, res, next) {
    Blog.find({'author': req.params.username, 'draft': false}, {upsert: true}, function (err, doc) {
        if (err) {
            console.log(err);
        } else {
            console.log("blogposts loaded");
            console.log(JSON.stringify(doc));
            res.send(JSON.stringify(doc));
        }
    });
});

//Get
router.get('/mydrafts/:username', function (req, res, next) {
    Blog.find({'author': req.params.username, 'draft': true}, {upsert: true}, function (err, doc) {
        if (err) {
            console.log(err);
        } else {
            console.log("drafts loaded");
            console.log(JSON.stringify(doc));
            res.send(JSON.stringify(doc));
        }
    });
});

//Delete
router.delete('/delete/:username/:title', function (req, res, next) {
    Blog.findOneAndRemove({'author': req.params.username, 'title': req.params.title}, function (err, doc) {
        if (err) {
            console.log(err);
        } else {
            console.log("post deleted!");
            res.send("Post deleted!");
        }
    });
});

//Put/edit
router.put('/makepublic/:username/:title', function (req, res, next) {
    Blog.findOneAndUpdate({
        'author': req.params.username,
        'title': req.params.title
    }, {$set: {draft: false}}, function (err, doc) {
        if (err) {
            console.log(err);
        } else {
            console.log("post public!");
            res.send("Post now public!");
        }
    });
});

//Put/edit
router.put('/editpost', function (req, res, next) {

    var editedBlogpostWithoutId = new Blog(req.body);
    editedBlogpostWithoutId = editedBlogpostWithoutId.toObject();
    //console.log("BEFORE REMOVE ------ " + editedBlogpostWithoutId);
    delete editedBlogpostWithoutId._id;
    //console.log("AFTER REMOVE ------ " + editedBlogpostWithoutId);

    Blog.findOneAndUpdate({'_id': req.body.id}, editedBlogpostWithoutId, {new: true}, function (err, doc) {
        if (err) {
            console.log(err);
        } else {
            res.send("succesfully saved");
        }
    });

});


module.exports = router;