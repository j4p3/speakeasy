//  modules
var http = require('http');
var url = require('url');
var fs = require('fs');
var log = require('./log');

//  server
function start(route, handle, client) {
	function onRequest(request, response) {
		var pathname = url.parse(request.url).pathname;
    log.enter(request.method + " " + pathname, "REQUEST");
		route(handle, pathname, request, response, client)
	}
	http.createServer(onRequest).listen(8888);
	log.enter("SERVER STARTED");
}

exports.start = start;