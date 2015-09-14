UserController = require('../controllers/UserController');

function homepage(req, res, next) {
    res.send('Cinstagram');
    next();
}

var route = function(server) {
    server.get('/', homepage);

    server.post('/auth', UserController.signin);
    server.get('/auth', UserController.signout);
};

module.exports = route;
