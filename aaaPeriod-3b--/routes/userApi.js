var express = require('express');
var router = express.Router();

var User = require('../model/userSchema');

router.post('/adduserinfo/:username', function (req, res, next) {

    User.findOneAndUpdate({'username': req.params.username}, req.body, {upsert: true}, function (err, doc) {
        if(err){
            console.log(err);
        } else {
            console.log("user updated! - " + doc);
        }
    });
});

module.exports = router;