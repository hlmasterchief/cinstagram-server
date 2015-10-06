var User = require('../models/User');
var jwt = require('jsonwebtoken');
var config = require('../config');

var UserController = {
    signin: function(req, res, next) {
        var username = req.body.username,
            password = req.body.password;
        User.findOne({ username: username }, function (err, user) {
            if (err) throw err;

            if (!user) {
                res.send({
                    success: false,
                    message: 'User not found.'
                });
                return next();
            }

            if (user.password != password) {
                res.send({
                    success: false,
                    message: 'Wrong password.'
                });
                return next();
            }

            var token = jwt.sign(user._id, config.secret, {
              expiresIn: '1d'
            });
            console.log(user.username + "\n" + token);

            res.send({
                success: true,
                message: 'Success.',
                token: token
            });
        });

        next();
    },

    signout: function(req, res, next) {
        res.send({
            success: true,
            message: 'User signout.'
        });
        next();
    },

    create: function(req, res, next) {
        var email    = req.body.email,
            username = req.body.username,
            password = req.body.password;

        var user = new User({
            email: email,
            username: username,
            password: password,
            avatar: ""
        });

        user.save(function(err) {
            if (err) throw err;

            var token = jwt.sign(user._id, config.secret, {
              expiresIn: '1d'
            });
            console.log(user.username + "\n" + token);

            res.send({
                success: true,
                message: 'Signup success.',
                token: token,
                username: username
            });
            next();
        });
    },

    readAll: function(req, res, next) {
        res.send('readAll');
        next();
    },

    read: function(req, res, next) {
        res.send('read');
        next();
    },

    update: function(req, res, next) {
        if (req.body.oldPassword != req.authUser.password) {
            res.send(403, {
                success: false,
                message: 'Wrong old password.'
            });
            return next();
        }

        req.authUser.email    = req.body.email,
        req.authUser.username = req.body.username,
        req.authUser.password = req.body.password;

        req.authUser.save(function(err) {
            if (err) throw err;

            res.send({
                success: true,
                message: 'Update success.',
                username: req.authUser.username
            });
            next();
        });
    },

    delete: function(req, res, next) {
        res.send('delete');
        next();
    }
};

module.exports = UserController;
