UserController = require('../controllers/UserController');
PostController = require('../controllers/PostController');
CommentController = require('../controllers/CommentController');
authentication = require('../middleware/authentication');

function homepage(req, res, next) {
    res.send('Cinstagram');
    next();
}

var route = function(server) {
    server.get('/', homepage);

    server.post('/auth', UserController.signin);
    server.get('/auth', authentication, UserController.signout);

    server.post('/users', UserController.create);
    server.get('/users/:id', UserController.read);
    server.put('/users', authentication, UserController.update);

    server.post('/posts', authentication, PostController.create);
    server.get('/posts/:id', PostController.read);
    server.put('/posts/:id', authentication, PostController.update);
    server.del('/posts/:id', authentication, PostController.delete);

    server.post('/posts/:pid/comments', authentication, CommentController.create);
    server.get('/comments/:id', CommentController.read);
    server.put('/comments/:id', authentication, CommentController.update);
    server.del('/comments/:id', authentication, CommentController.delete);
};

module.exports = route;
