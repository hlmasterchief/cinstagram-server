var Post = require('../models/Post');
var User = require('../models/User');
var cloudinary = require('cloudinary');

var PostController = {
    create: function(req, res, next) {
        if (!req.files.image) {
           res.send(400, {
                success: false,
                message: 'No image.'
            });
            return next();
        }

        cloudinary.uploader.upload(req.files.image.path, function(result) { 
            var post = new Post({
                image: result.url,
                caption: "",
                user: req.authUser._id
            });

            if (!!req.body.caption) {
                post.caption = req.body.caption
            }

            post.save(function(err) {
                if (err) throw err;

                res.send({
                    success: true,
                    message: 'Post success.',
                    image: post.image,
                    caption: post.caption
                });

                User.update({_id: req.authUser._id}, {
                    $push: {'posts': post._id}
                }, function(err,res) {
                    console.log(err);
                });
                next();
            });
        }, {
            folder: "image"
        });
        next();
    },

    readAll: function(req, res, next) {
        Post.find({ })
            // .lean()
            .populate('user', 'username avatar')
            .populate('comments', 'text user')
            .populate('likes', 'username')
            .sort({date: -1})
            .exec(function(err, posts) {

            if (err) throw err;

            if (!posts) {
                res.send(404, {
                    success: false,
                    message: 'Posts not found.'
                });
                return next();
            }

            var options = {
              path: 'comments.user',
              select: 'username',
              model: 'User'
            };

            Post.populate(posts, options, function (err, postsFull) {
                if (err) throw err;

                res.send({
                    success: true,
                    message: 'Get all posts success.',
                    posts: postsFull
                });
            });
        });
        next();
    },

    readFeed: function(req, res, next) {
        var feed = req.authUser.followings;
        feed.push(req.authUser._id);

        Post.find({ user: { $in: feed } })
            // .lean()
            .populate('user', 'username avatar')
            .populate('comments', 'text user')
            .populate('likes', 'username')
            .sort({date: -1})
            .exec(function(err, posts) {

            if (err) throw err;

            if (!posts) {
                res.send(404, {
                    success: false,
                    message: 'Posts not found.'
                });
                return next();
            }

            var options = {
              path: 'comments.user',
              select: 'username',
              model: 'User'
            };

            Post.populate(posts, options, function (err, postsFull) {
                if (err) throw err;

                res.send({
                    success: true,
                    message: 'Get all posts success.',
                    posts: postsFull
                });
            });
        });
        next();
    },

    readUser: function(req, res, next) {
        Post.find({ user: req.params.id })
            // .lean()
            .populate('user', 'username avatar')
            .populate('comments', 'text user')
            .populate('likes', 'username')
            .sort({date: -1})
            .exec(function(err, posts) {

            if (err) throw err;

            if (!posts) {
                res.send(404, {
                    success: false,
                    message: 'Posts not found.'
                });
                return next();
            }

            var options = {
              path: 'comments.user',
              select: 'username',
              model: 'User'
            };

            Post.populate(posts, options, function (err, postsFull) {
                if (err) throw err;

                res.send({
                    success: true,
                    message: 'Get user posts success.',
                    posts: postsFull
                });
            });
        });
        next();
    },

    read: function(req, res, next) {
        Post.findOne({ _id: req.params.id }, function (err, post) {
            if (err) throw err;

            if (!post) {
                res.send(404, {
                    success: false,
                    message: 'Post not found.'
                });
                return next();
            }

            res.send({
                success: true,
                message: 'Success.',
                post: post
            });
        });
        next();
    },

    update: function(req, res, next) {
        Post.findOne({ _id: req.params.id }, function (err, post) {
            if (err) throw err;

            if (!post) {
                res.send(404, {
                    success: false,
                    message: 'Post not found.'
                });
                return next();
            }

            if (!post.user.equals(req.authUser._id)) {
                res.send(401, {
                    success: false,
                    message: 'Not authorized.'
                });
                return next();
            }

            if (!!req.body.caption) {
                post.caption = req.body.caption
            }

            post.save(function(err) {
                if (err) throw err;

                res.send({
                    success: true,
                    message: 'Post update success.',
                    image: post.image,
                    caption: post.caption
                });
                next();
            });
        });
    },

    delete: function(req, res, next) {
        Post.findOne({ _id: req.params.id }, function (err, post) {
            if (err) throw err;

            if (!post) {
               res.send(404, {
                    success: false,
                    message: 'Post not found.'
                });
                return next();
            }

            if (!post.user.equals(req.authUser._id)) {
               res.send(401, {
                    success: false,
                    message: 'Not authorized.'
                });
                return next();
            }

            post.remove(function(err) {
                if (err) throw err;

                res.send({
                    success: true,
                    message: 'Post delete success.',
                });

                User.update({_id: req.authUser._id}, {
                    $pull: {'posts': post._id}
                }, function(err,res) {
                    console.log(err);
                });
                next();
            });
        });
    }
};

module.exports = PostController;
