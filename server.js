var http = require('http');
var url = require('url');

function start(route, handlers, client) {

	function onRequest(request, response) {
		var pathname = url.parse(request.url).pathname;
    console.log("request received for "+ pathname);
		route(handlers, pathname, request, response, client)
	}

	http.createServer(onRequest).listen(8888);
	console.log("server started");
}

exports.start = start;