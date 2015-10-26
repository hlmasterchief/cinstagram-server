var UserController = require('../controllers/UserController');
var PostController = require('../controllers/PostController');
var CommentController = require('../controllers/CommentController');
var LikeController = require('../controllers/LikeController');
var FollowController = require('../controllers/FollowController');
var authentication = require('../middleware/authentication');

function homepage(req, res, next) {
    res.send('Cinstagram');
    next();
}

var route = function(server) {
    server.get('/', homepage);

    server.post('/auth', UserController.signin);
    server.get('/auth', authentication, UserController.signout);

    server.post('/users', UserController.create);
    server.post('/users/search', UserController.search);
    server.get('/users/:id', UserController.read);
    server.put('/users', authentication, UserController.update);

    server.get('/users/:id/posts', PostController.readUser);

    server.post('/posts', authentication, PostController.create);
    server.get('/posts/all', PostController.readAll);
    server.get('/posts/feed', authentication, PostController.readFeed);
    server.get('/posts/:id', PostController.read);
    server.put('/posts/:id', authentication, PostController.update);
    server.del('/posts/:id', authentication, PostController.delete);

    server.post('/posts/:pid/comments', authentication, CommentController.create);
    server.get('/posts/:pid/comments', CommentController.readAll);
    server.get('/comments/:id', CommentController.read);
    server.put('/comments/:id', authentication, CommentController.update);
    server.del('/comments/:id', authentication, CommentController.delete);

    server.get('/activity', authentication, LikeController.activity);
    server.get('/activity/you', authentication, LikeController.activityYou);

    server.put('/posts/:pid/like', authentication, LikeController.update);

    server.put('/users/:id/follow', authentication, FollowController.update);
};

module.exports = route;
