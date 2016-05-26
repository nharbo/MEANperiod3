var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var commentSchema = new Schema({
    content: { type: String, required: true},
    author: { type: String, required: true },
    belongsTo: Schema.Types.Mixed, //id på den blogpost kommentaren hører til..
    created_at: Date,
    updated_at: Date
});

// we need to create a model using it
var Comment = mongoose.model('Comment', commentSchema);

// make this available to our users in our Node applications
module.exports = Comment;