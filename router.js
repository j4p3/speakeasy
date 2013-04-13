var log = require('./log');

function route(handle, pathname, request, response, client) {
  log.enter("", "ROUTE");
  //  valid urls will return a function from the URIs hash 'handle'
  if (typeof(handle[pathname]) === 'function') {
    handle[pathname](response, request, client)
  } else {
    log.enter("NO REQUEST HANDLER FOR " + pathname, 404)
    response.writeHead(404, {"Content-Type": "text/plain"});
    response.end();
  }
}

exports.route = route;