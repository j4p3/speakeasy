function route(handle, pathname, request, response, client) {
  console.log("routing "+ pathname);
  //  valid urls
  if (typeof(handle[pathname]) === 'function') {
    handle[pathname](response, request, client)
  } else {
    console.log("no request handler for " + pathname);
    response.writeHead(404, {"Content-Type": "text/plain"});
    response.write("404 not found");
    response.end();
  }
}

exports.route = route;