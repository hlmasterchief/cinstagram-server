var mongoose = require('mongoose');
var PostSchema = require('../schema/PostSchema');

var Post = mongoose.model('Post', PostSchema);

module.exports = Post;
