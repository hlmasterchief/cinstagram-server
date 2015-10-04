var mongoose = require('mongoose');
var UserSchema = require('../schema/UserSchema');

var User = mongoose.model('User', UserSchema);

module.exports = User;
