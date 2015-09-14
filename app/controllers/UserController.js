User = require('../models/User');

var UserController = {
    signin: function(req, res, next) {
        User.find(function (err, user) {
          if (err) return console.error(err);
          console.log(user);
        })
        res.send('signin');
        next();
    },
    signup: function(req, res, next) {
        res.send('signup');
        var UserModel = new User(req.body);
        UserModel.save();
        next();
    },
    signout: function(req, res, next) {
        res.send('signout');
        next();
    }
};

module.exports = UserController;