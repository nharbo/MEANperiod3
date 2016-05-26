var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

// create a schema
var userSchema = new Schema({
    firstname: String,
    lastname: String,
    username: String, /*{ type: String, required: true, unique: true },*/
    password: { type: String, required: true },
    admin: Boolean,
    birthday: Date,
    age: Number,
    email: { type: String, required: true, unique: true },
    gender: String,
    phone: String,
    country: String,
    city: String,
    created_at: Date,
    updated_at: Date,
    active: Boolean,
    facebookId: String
});

userSchema.pre('save', function (next) {
    var user = this;

    if (!user.isModified('password')) return next();

    bcrypt.genSalt(10, function (err, salt) {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);

            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

// the schema is useless so far
// we need to create a model using it
var User = mongoose.model('User', userSchema);

// make this available to our users in our Node applications
module.exports = User;
