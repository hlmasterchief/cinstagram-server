var mongoose = require('mongoose');
var LikeSchema = require('../schema/LikeSchema');

var Like = mongoose.model('Like', LikeSchema);

module.exports = Like;
