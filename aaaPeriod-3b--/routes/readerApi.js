var express = require('express');
var router = express.Router();

var Blog = require('../model/blogpostSchema');

router.get('/allposts/', function (req, res, next) {
    Blog.find({'draft': false}, function (err, doc) {
        if (err) {
            console.log(err);
        } else {
            console.log("blogposts loaded");
            console.log(JSON.stringify(doc));
            res.send(JSON.stringify(doc));
        }
    });
});

router.post('/newcomment/:blogpostid', function (req, res, next) {

    var comment = {
        author: req.body.author,
        content: req.body.content,
        created_at: Date
    };

    Blog.findOneAndUpdate({'_id': req.params.blogpostid}, {$push: {comments: comment}}, {safe: true, upsert: true}, function (err, doc) {
            if(err){
                console.log(err);
            } else {
                res.send(req.body);
                console.log("comment added! - " + doc);
            }
            //Muligvis skal kommentaren også gemmes under useren, så man kan se alle sine kommentarer et sted..
        }
    );
});

//router.post('/edit/:blogpostid/:commentid', function (req, res, next) {
//
//}


module.exports = router;