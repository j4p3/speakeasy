var client = require('twilio')(sid, token);
var server = require('./server');
var router = require('./router');
var requestHandlers = require('./requestHandlers');

var handle = {};
handle['/'] = requestHandlers.home;
handle['/call'] = requestHandlers.call;
handle['/post_call'] = requestHandlers.post_call;
handle['/favicon.ico'] = requestHandlers.favicon;

console.log("application started");
server.start(router.route, handle, client);