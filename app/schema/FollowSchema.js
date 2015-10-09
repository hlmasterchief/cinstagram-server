var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FollowSchema = new Schema({
    follower: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    followee: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = FollowSchema;
