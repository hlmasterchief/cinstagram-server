User = require('../models/User');

var UserController = {
    signin: function(req, res, next) {
        res.send('signin');
        next();
    },
    signout: function(req, res, next) {
        res.send('signout');
        next();
    },
    create: function(req, res, next) {
        res.send('create');
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
