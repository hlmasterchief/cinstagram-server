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

    server.post('/posts', PostController.create);
    server.get('/posts', PostController.readAll);
    server.get('/posts/:id', PostController.read);
    server.put('/posts/:id', PostController.update);
    server.del('/posts/:id', PostController.delete);

    server.post('/comments', CommentController.create);
    server.get('/comments', CommentController.readAll);
    server.get('/comments/:id', CommentController.read);
    server.put('/comments/:id', CommentController.update);
    server.del('/comments/:id', CommentController.delete);
};

module.exports = route;
