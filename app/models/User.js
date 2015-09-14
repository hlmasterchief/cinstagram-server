var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var UserSchema = new Schema({
    email: String,
    password: String
});

mongoose.model('User', UserSchema);
var User = mongoose.model("User");

module.exports = User;
