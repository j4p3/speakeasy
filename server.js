var http = require('http');
var url = require('url');
var fs = require('fs');

function start(route, handle, client) {

	function onRequest(request, response) {
		var pathname = url.parse(request.url).pathname;
    console.log("request received for "+ pathname);
    console.log("with http method: " + request.method);
		route(handle, pathname, request, response, client)
	}

	http.createServer(onRequest).listen(8888);
	console.log("server started");
}

exports.start = start;