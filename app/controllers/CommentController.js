var Comment = require('../models/Comment');
var Post = require('../models/Post');

var CommentController = {
    create: function(req, res, next) {
        if (!req.body.text) {
           res.send(400, {
                success: false,
                message: 'No text.'
            });
            return next();
        }

        Post.findOne({ _id: req.params.pid }, function (err, post) {
            if (err) throw err;

            if (!post) {
               res.send(404, {
                    success: false,
                    message: 'Post not found.'
                });
                return next();
            }

            var comment = new Comment({
                text: req.body.text,
                post: post._id,
                user: req.authUser._id
            });

            comment.save(function(err) {
                if (err) throw err;

                res.send({
                    success: true,
                    message: 'Comment success.',
                    text: comment.text,
                    post: comment.post,
                    user: comment.user
                });
                next();
            });
        });
    },

    readAll: function(req, res, next) {
        res.send('readAll');
        next();
    },

    read: function(req, res, next) {
        Comment.findOne({ _id: req.params.id }, function (err, comment) {
            if (err) throw err;

            if (!comment) {
               res.send(404, {
                    success: false,
                    message: 'Comment not found.'
                });
                return next();
            }

            res.send({
                success: true,
                message: 'Success.',
                comment: comment
            });
            next();
        });
    },

    update: function(req, res, next) {
        Comment.findOne({ _id: req.params.id }, function (err, comment) {
            if (err) throw err;

            if (!comment) {
               res.send(404, {
                    success: false,
                    message: 'Comment not found.'
                });
                return next();
            }

            if (!comment.user.equals(req.authUser._id)) {
               res.send(401, {
                    success: false,
                    message: 'Not authorized.'
                });
                return next();
            }

            if (!!req.body.text) {
                comment.text = req.body.text
            }

            comment.save(function(err) {
                if (err) throw err;

                res.send({
                    success: true,
                    message: 'Comment update success.',
                    text: comment.text,
                    post: comment.post,
                    user: comment.user
                });
                next();
            });
        });
    },

    delete: function(req, res, next) {
        Comment.findOne({ _id: req.params.id }, function (err, comment) {
            if (err) throw err;

            if (!comment) {
               res.send(404, {
                    success: false,
                    message: 'Comment not found.'
                });
                return next();
            }

            if (!comment.user.equals(req.authUser._id)) {
               res.send(401, {
                    success: false,
                    message: 'Not authorized.'
                });
                return next();
            }

            comment.remove(function(err) {
                if (err) throw err;

                res.send({
                    success: true,
                    message: 'Comment delete success.',
                });
                next();
            });
        });
    }
};

module.exports = CommentController;
