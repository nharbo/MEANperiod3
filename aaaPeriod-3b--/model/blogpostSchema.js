var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a SCHEMA
var blogpostSchema = new Schema({
    title: { type: String, required: true},
    content: { type: String, required: true},
    author: { type: String, required: true },
    category: Schema.Types.Mixed,
    created_at: Date,
    draft: Boolean,
    updated_at: Date,
    comments: Schema.Types.Mixed,
    coverpic: Schema.Types.Mixed,
    latitude: String,
    longitude: String
});

// we need to create a MODEL using it
var Blogpost = mongoose.model('Blogpost', blogpostSchema);

// make this available to our users in our Node applications
module.exports = Blogpost;