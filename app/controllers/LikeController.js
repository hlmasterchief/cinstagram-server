var Like = require('../models/Like');
var Post = require('../models/Post');

var LikeController = {
    update: function(req, res, next) {
        Post.findOne({ _id: req.params.pid }, function (err, post) {
            if (err) throw err;

            if (!post) {
               res.send(404, {
                    success: false,
                    message: 'Post not found.'
                });
                return next();
            }

            Like.findOne({
                user: req.authUser._id,
                post: req.params.pid
            }, function(err, like) {
                if (err) throw err;

                if (!!like) {
                    like.remove(function(err) {
                        if (err) throw err;
                    });

                    res.send({
                        success: true,
                        message: 'Unlike successfully.'
                    });

                    Post.update({_id: req.params.pid}, {
                        $inc: {'like': -1},
                        $pull: {'likes': req.authUser._id}
                    }, function(err,res) {
                        console.log(err);
                    });
                    return next();
                }

                var like = new Like({
                    user: req.authUser._id,
                    post: req.params.pid
                });

                like.save(function(err) {
                    if (err) throw err;

                    res.send({
                        success: true,
                        message: 'Like successfully.'
                    });

                    Post.update({_id: req.params.pid}, {
                        $inc: {'like': 1},
                        $push: {'likes': req.authUser._id}
                    }, function(err,res) {
                        console.log(err);
                    });
                    next();
                });
            });
        });
    }  
};

module.exports = LikeController;
