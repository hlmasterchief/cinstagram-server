var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    email: String,
    username: String,
    password: String,
    avatar: String
});

module.exports = UserSchema;
