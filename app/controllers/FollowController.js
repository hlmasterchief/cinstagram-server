var Follow = require('../models/Follow');
var User = require('../models/User');

var FollowController = {
    update: function(req, res, next) {
        User.findOne({ _id: req.params.id }, function (err, user) {
            if (err) throw err;

            if (!user) {
               res.send(404, {
                    success: false,
                    message: 'User not found.'
                });
                return next();
            }

            Follow.findOne({
                follower: req.authUser._id,
                followee: req.params.id
            }, function(err, follow) {
                if (err) throw err;

                if (!!follow) {
                    follow.remove(function(err) {
                        if (err) throw err;
                    });

                    res.send({
                        success: true,
                        message: 'Unfollow successfully.'
                    });
                    return next();
                }

                var follow = new Follow({
                    follower: req.authUser._id,
                    followee: req.params.id
                });

                follow.save(function(err) {
                    if (err) throw err;

                    res.send({
                        success: true,
                        message: 'Follow successfully.'
                    });
                    next();
                });
            });
        });
    }
};

module.exports = FollowController;
