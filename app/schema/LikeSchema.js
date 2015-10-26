var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LikeSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post'
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = LikeSchema;
