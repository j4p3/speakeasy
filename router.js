function route(handlers, pathname, request, response, client) {
  console.log("routing "+ pathname);
  //  valid urls
  if (typeof handlers[pathname] === 'function') {
    handlers[pathname](response, request, client)
  } else
  //  invalid urls
  {
    console.log("no request handler for " + pathname);
    response.writeHead(404, {"Content-Type": "text/plain"});
    response.write("404 not found");
    response.end();
  }
}

exports.route = route;