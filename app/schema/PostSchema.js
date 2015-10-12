var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema({
    caption: String,
    image: String,
    date: {
        type: Date,
        default: Date.now
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    like: {
        type: Number,
        default: 0
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
});

module.exports = PostSchema;
