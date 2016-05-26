var User = require('../model/userSchema');
var Blogpost = require('../model/blogpostSchema');
var Comment = require('../model/commentSchema');

//var db = require('../db/mongoose');

var newUser = new User({
    firstname: "Nicolai",
    lastname: "Harbo",
    username: "blogger",
    password: "test",
    admin: Boolean,
    birthday: Date,
    age: Number,
    email: String,
    gender: String,
    phone: String,
    country: String,
    city: String,
    created_at: Date,
    updated_at: Date
});

var newBlogpost = new Blogpost({
    title: "En blog om hygge",
    content: "Masser af bloghygge og bla bla bla",
    author: "nico",
    category: ["Mad", "Hygge"],
    created_at: new Date(),
    updated_at: new Date()
});

var newComment = new Comment({
    content: "Mega fed blog, tak for det.",
    author: "commenter",
    belongsTo: [{"blogpostTitle" : "En blog om hygge", "blogAuthor" : "nico"}],
    created_at: new Date(),
    updated_at: new Date()
});

//newUser.save(function(err){
//    if(!err){console.log("user created!")}
//    else {console.log(err)}
//});

//newBlogpost.save(function(err){
//    if(!err){console.log("blogpost created!")}
//    else {console.log(err)}
//});

newComment.save(function(err){
    if(!err){console.log("comment created!")}
    else {console.log(err)}
});