var jwt = require('jsonwebtoken');
var config = require('../config');
var User = require('../models/User');

module.exports = function(req, res, next) {

    var token = req.headers['x-access-token'];

    if (!token) {
        res.send(403, {
            success: false,
            message: 'No token.'
        });
        return next();
    }

    jwt.verify(token, config.secret, function(err, decoded) {
        if (err) {
            res.send(403, {
                success: false,
                message: 'Wrong token.'
            });
            return next();
        }

        User.findOne({ _id: decoded }, function (err, user) {
            if (err) throw err;

            if (!user) {
                res.send({
                    success: false,
                    message: 'User not found.'
                });
                return next();
            }

            req.authUser = user;
            next();
        });
    });
}