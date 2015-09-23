var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var CommentSchema = new Schema({
    text: String,
    date: {
        type: Date,
        default: Date.now
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

mongoose.model('Comment', CommentSchema);
var Comment = mongoose.model("Comment");

module.exports = Comment;
