var db = require('./app/core/db');
var server = require('./app/core/server');

var morgan = require('morgan');
server.use(morgan('dev'));

var route  = require('./app/core/route')(server);

var port = process.env.PORT || 5000;
server.listen(port, function() {
    console.log(server.name + " started at port " + port);
});
