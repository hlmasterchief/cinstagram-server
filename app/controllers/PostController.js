var Post = require('../models/Post');
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
                next();
            });
        }, {
            folder: "image"
        });
        next();
    },

    readAll: function(req, res, next) {
        res.send('readAll');
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
                next();
            });
        });
    }
};

module.exports = PostController;
