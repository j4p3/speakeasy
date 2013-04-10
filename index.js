var sid = 'ACf0804846d747c1c8667b2cd293ffe5d6'
var token = '83670dcd5459e23975eb8ccfedc9d0c0'

var client = require('twilio')(sid, token);
var server = require('./server');
var router = require('./router');
var requestHandlers = require('./requestHandlers');

var handle = {};
handle['/'] = requestHandlers.home;
handle['/user/new'] = requestHandlers.createUser;
handle['/favicon.ico'] = requestHandlers.favicon;

console.log("application started");
server.start(router.route, handle, client);