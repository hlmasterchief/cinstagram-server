var restify = require("restify");
var server = restify.createServer({
	name: 'cinstagram-server',
	version: '0.1.0'
});

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

restify.CORS.ALLOW_HEADERS.push('x-access-token');

module.exports = server;
