var request = require("request");

var options = {
    url: "http://localhost:3000/user/adduserinfo/lol",
    method: "POST",
    json: true,
    body: {
        firstname: "LoL",
        lastname: "Manden",
        birthday: new Date(),
        age: 23,
        email: "lol@lol.dk",
        gender: "Male",
        phone: "000202002",
        country: "Denmark",
        city: "CPH",
        created_at: new Date(),
        updated_at: new Date()
    }
};

request (options, function (error, res, body) {
    console.log("i apiTest: " + body);
});

//var options = {
//    url: "http://localhost:3000/api/blogger/newpost",
//    method: "POST",
//    json: true,
//    body: {countryname: "lolland"}
//};
//
//request (options, function (error, res, body) {
//    console.log("fra apiTest: " + body);
//});