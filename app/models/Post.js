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
    }
});

mongoose.model('Post', PostSchema);
var Post = mongoose.model("Post");

module.exports = Post;
