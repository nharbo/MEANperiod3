var express = require('express');
var router = express.Router();





//router.post('/addnewcountry', function (req, res, next) {
//    var country = req.body;
//    db.query('INSERT INTO COUNTRY SET ?', country, function (err, result) {
//        if (err == null) {
//            var info = {"info": "Successfully added " + country.countryname + " to countries"};
//            res.infoToUser = JSON.stringify(info);
//            console.log("SUCCESS: " + res.infoToUser);
//        } else {
//            var info = {"info": "Failed adding " + country.countryname, "error": err};
//            res.infoToUser = JSON.stringify(info);
//            console.log("FAILED: " + res.infoToUser);
//        }
//    });
//});

module.exports = router;