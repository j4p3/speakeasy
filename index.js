var client = require('twilio')();
var server = require('./server');
var router = require('./router');
var requestHandlers = require('./requestHandlers');

var handlers = {};
handlers['/'] = requestHandlers.home;
handlers['/user/new'] = requestHandlers.createUser;

console.log("application started");
server.start(router.route, handlers, client);