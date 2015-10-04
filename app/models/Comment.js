var mongoose = require('mongoose');
var CommentSchema = require('../schema/CommentSchema');

var Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
