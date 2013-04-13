//  modules
var fs = require('fs');
var log = require('./log');

//  render views
function render(response, view, type) {
  type = type || 'html';

  log.enter("RENDER " + view, "RH");
  fs.readFile(view + '.' + type, function(err, data) {
    if (err) throw err;
    response.writeHead(200, {"Content-Type": "text/" + type});
    response.write(data);
    response.end();
  });
}

//  handlers
function favicon(response, request) {
  //  prevent 404 on obnoxious double request for favicon
  response.writeHead(200, {'Content-Type': 'image/x-icon'} );
  response.end();
}

function home(response, request) {
  //  render index page
  log.enter("HOME", "RH");
  render(response, 'views/index');
}

function call(response, request, client) {
  log.enter("CALL", "RH");

  if (request.method = "GET") {
    //  TWILIO REQUESTING CALL SCRIPT
    render(response, 'twilio/call', 'xml')
  } else if (request.method = "POST") {
    //  TWILIO SENDING DATA
    log.enter("CALL (NEW DATA FROM TWILIO)", "RH");
    response.writeHead(200).end();
  };
}

//  exports
exports.home = home;
exports.call = call;
exports.favicon = favicon;
