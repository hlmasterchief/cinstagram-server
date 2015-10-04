User = require('../models/User');

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

            res.send({
                success: true,
                message: 'Success.'
            });
        });

        next();
    },
    signout: function(req, res, next) {
        res.send('signout');
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

        user.save();

        res.send(user);
        next();
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
        res.send('update');
        next();
    },
    delete: function(req, res, next) {
        res.send('delete');
        next();
    }
};

module.exports = UserController;
