var mongoose = require('mongoose');
var FollowSchema = require('../schema/FollowSchema');

var Follow = mongoose.model('Follow', FollowSchema);

module.exports = Follow;
