var User = require('../models/User');
var jwt = require('jsonwebtoken');
var config = require('../config');
var cloudinary = require('cloudinary');
var async = require("async");
var bcrypt = require('bcrypt');

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

            bcrypt.compare(password, user.password, function(err, result) {
                if (err) throw err;

                if (!result) {
                    res.send({
                        success: false,
                        message: 'Wrong password.'
                    });
                    return next();
                }

                var token = jwt.sign(user._id, config.secret, {
                  expiresIn: '1d'
                });

                res.send({
                    success: true,
                    message: 'Success.',
                    token: token
                });
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
        if (req.body.email.length === 0) {
            res.send({
                success: false,
                message: 'Email has not been filled.'
            });
            return next();
        }

        if (req.body.username.length === 0) {
            res.send({
                success: false,
                message: 'Username has not been filled.'
            });
            return next();
        }

        if (req.body.password.length === 0) {
            res.send({
                success: false,
                message: 'Password has not been filled.'
            });
            return next();
        }

        async.parallel([
            function(callback) {
                User.findOne({ email: req.body.email }, function (err, user) {
                    if (err) throw err;

                    if (!!user) {
                        return callback(null, 'Email has been used.');
                    }
                    callback();
                });
            },
            function(callback) {
                User.findOne({ username: req.body.username }, function (err, user) {
                    if (err) throw err;

                    if (!!user) {
                        return callback(null, 'Username has been used.');
                    }
                    callback();
                });
            }
        ], function(err, message) {
            if (message[0] || message[1]) {
                res.send({
                    success: false,
                    message: message
                });
                return next();
            }

            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(req.body.password, salt, function(err, hash) {
                    var user = new User({
                        email:    req.body.email,
                        username: req.body.username,
                        password: hash,
                        avatar:   ""
                    });

                    user.save(function(err) {
                        if (err) throw err;

                        var token = jwt.sign(user._id, config.secret, {
                          expiresIn: '1d'
                        });

                        res.send({
                            success: true,
                            message: 'Signup success.',
                            token: token,
                            username: user.username
                        });
                        next();
                    });
                });
            });
        });
    },

    readAll: function(req, res, next) {
        res.send('readAll');
        next();
    },

    read: function(req, res, next) {
        User.findOne({ _id: req.params.id }, function (err, user) {
            if (err) throw err;

            if (!user) {
               res.send(404, {
                    success: false,
                    message: 'User not found.'
                });
                return next();
            }

            res.send({
                success: true,
                message: 'Success.',
                user: user
            });
        });
        next();
    },

    update: function(req, res, next) {
        if (!!req.body.password) {
            bcrypt.compare(req.body.oldPassword, req.authUser.password, function(err, result) {
                if (err) throw err;

                if (!result) {
                    res.send(403, {
                        success: false,
                        message: 'Wrong old password.'
                    });
                    return next();
                }


                bcrypt.genSalt(10, function(err, salt) {
                    bcrypt.hash(req.body.password, salt, function(err, hash) {
                        req.authUser.password =  hash;

                        req.authUser.save(function(err) {
                            if (err) throw err;

                            res.send({
                                success: true,
                                message: 'Update password success.',
                                username: req.authUser.username
                            });
                            next();
                        });
                    });
                });
            });
            return next();
        }

        if (!!req.files.avatar) {
            cloudinary.uploader.upload(req.files.avatar.path, function(result) { 
                
                req.authUser.avatar = result.url;
                req.authUser.save(function(err) {
                    if (err) throw err;

                    res.send({
                        success: true,
                        message: 'Update avatar success.',
                        avatar: req.authUser.avatar
                    });
                    next();
                });
            }, {
                folder: "avatar"
            });
            return next();
        }

        if (req.body.email.length === 0) {
            res.send({
                success: false,
                message: 'Email has not been filled.'
            });
            return next();
        }

        if (req.body.username.length === 0) {
            res.send({
                success: false,
                message: 'Username has not been filled.'
            });
            return next();
        }

        async.parallel([
            function(callback) {
                User.findOne({ email: req.body.email }, function (err, user) {
                    if (err) throw err;

                    if ((!!user) && (!user._id.equals(req.authUser._id))) {
                        return callback(null, 'Email has been used.');
                    }
                    callback();
                });
            },
            function(callback) {
                User.findOne({ username: req.body.username }, function (err, user) {
                    if (err) throw err;

                    if ((!!user) && (!user._id.equals(req.authUser._id))) {
                        return callback(null, 'Username has been used.');
                    }
                    callback();
                });
            }
        ], function(err, message) {
            if (message[0] || message[1]) {
                res.send({
                    success: false,
                    message: message
                });
                return next();
            }
            
            req.authUser.email    = req.body.email,
            req.authUser.username = req.body.username,

            req.authUser.save(function(err) {
                if (err) throw err;

                res.send({
                    success: true,
                    message: 'Update username/email success.',
                    username: req.authUser.username
                });
                next();
            });
        });
    },

    delete: function(req, res, next) {
        res.send('delete');
        next();
    }
};

module.exports = UserController;
