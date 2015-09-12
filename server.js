var restify = require("restify");
var server = restify.createServer({
	name: 'cinstagram-server',
	version: '0.1.0'
});

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

function homepage(req, res, next) {
    res.send('Restify API!');
    next();
}

function signin(req, res, next) {
    res.send('Restify API!');
    next();
}

function signup(req, res, next) {
    res.send('Restify API!');
    next();
}

server.get('/', homepage);

server.get('/auth/', signin);
server.post('/auth/', signin);

server.get('/auth/new/', signup);
server.post('/auth/new/', signup);

var port = process.env.PORT || 5000;
server.listen(port, function() {
    console.log(server.name + " started at port " + port);
});