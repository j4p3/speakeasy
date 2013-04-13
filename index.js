// modules
var client = require('twilio')();
var server = require('./server');
var router = require('./router');
var requestHandlers = require('./requestHandlers');
var log = require('./log');

//  valid URIs
var handle = {};
handle['/'] = requestHandlers.home;
handle['/call'] = requestHandlers.call;
handle['/favicon.ico'] = requestHandlers.favicon;

log.enter("APPLICATION STARTED");
server.start(router.route, handle, client);