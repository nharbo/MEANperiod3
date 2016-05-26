var LocalStrategy = require('passport-local').Strategy;
var User = require('../../model/userSchema');


var strategyOptions = {
    usernameField: 'email',
    passwordField: 'password'
};

exports.login = new LocalStrategy(strategyOptions, function (email, password, done) {
    console.log("INSIDE LOGIN STRATEGY:::::::::::");

    User.findOne({email: email}, function (err, user) {
        if (err)
            return done(null, false, {message: "Something went wrong trying to register user"}); // error=null, user=false, message=obj

        if (!user) {
            console.log("LOGIIIIIIN: no user found");
            return done(null, false, {message: "No user with this email"}); // error=null, user=false, message=obj
        } else {
            user.comparePassword(password, function (err, isMatch) {
                if (isMatch && !err) {
                    console.log("user is active: " + user.active);
                    done(null, user);
                }

            });
        }
    });
});

//bcrypt.compare(passw, this.password, function (err, isMatch) {
//    if (err) {
//        return cb(err);
//        console.log("----error----");
//        done(null, false, {message: 'Bad password'});
//    } else {
//        cb(null, isMatch);
//        console.log("no errors");
//        console.log("user is active: " + user.active);
//    }
//
//});

//if (hash.verify(password, user.password)) {
//    //user = JSON.stringify(user);
//    console.log("no errors");
//    console.log("user is active: " + user.active);
//    done(null, user);
//} else {
//    console.log("----error----");
//    done(null, false, {message: 'Bad password'});
//}


exports.register = new LocalStrategy(strategyOptions, function (email, password, done) {

    console.log("INSIDE REGISTER STRATEGY:::::::::::");
    User.findOne({email: email}, function (err, user) {

        if (err) {
            console.log("TEST_1");
            return done(err);
        }

        if (user) {
            console.log("TEST_2");
            return done(null, false, {message: "A user with this email already excists"}); // error=null, user=false, message=obj
        }

        var newUser = new User({
            email: email,
            password: password
        });

        newUser.save(function (err) {
            if (err) {
                console.log("TEST_3");
                console.log("Err: " + err);
                return done(null, false, {message: "Not able to create user"});
            } // error=null, user=false, message=obj

            done(null, newUser);
        });
    });
});


//var hashedPassword = "random unhashed password";
//// Ready to create new user with hashed password
////var hashedPwd = hash.generate(password);
//
//console.log("BEFORE SALT");
//bcrypt.genSalt(10, function (err, salt) {
//    console.log("INSIDE SALT");
//    if (err) {
//        console.log("SALT ERROR");
//        console.log(err);
//        return next(err);
//    }
//    bcrypt.hash(password, salt, function (err, hash) {
//        console.log("INSIDE HASH");
//        if (err) {
//            console.log("HASH ERROR");
//            console.log(err);
//            return next(err);
//        }
//        console.log("PASSWORD HASHED");
//        console.log("HASH = " + hash);
//        hashedPassword = hash;
//        //next();
//    });
//});