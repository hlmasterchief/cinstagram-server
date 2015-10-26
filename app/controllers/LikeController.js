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
                        $push: {'likes': req.authUser._id}
                    }, function(err,res) {
                        console.log(err);
                    });
                    next();
                });
            });
        });
    },

    activity: function(req, res, next) {
        var followings = req.authUser.followings;

        Like.find({ user: { $in: followings } })
            // .lean()
            .populate('user', 'username avatar')
            .populate('post', 'image user')
            // .sort({date: -1})
            .exec(function(err, activities) {

            if (err) throw err;

            if (!activities) {
                res.send(404, {
                    success: false,
                    message: 'Activities not found.'
                });
                return next();
            }

            var options = {
              path: 'post.user',
              select: 'username',
              model: 'User'
            };

            Like.populate(activities, options, function (err, activitiesFull) {
                if (err) throw err;

                res.send({
                    success: true,
                    message: 'Get all activities success.',
                    activities: activitiesFull
                });
            });
        });
        next();
    },

    activityYou: function(req, res, next) {
        var posts = req.authUser.posts;

        Like.find({ post: { $in: posts } })
            // .lean()
            .populate('user', 'username avatar')
            .populate('post', 'image user')
            // .sort({date: -1})
            .exec(function(err, activities) {

            if (err) throw err;

            if (!activities) {
                res.send(404, {
                    success: false,
                    message: 'Activities not found.'
                });
                return next();
            }

            var options = {
              path: 'post.user',
              select: 'username',
              model: 'User'
            };

            Like.populate(activities, options, function (err, activitiesFull) {
                if (err) throw err;

                res.send({
                    success: true,
                    message: 'Get all activities success.',
                    activities: activitiesFull
                });
            });
        });
        next();
    }
};

module.exports = LikeController;
