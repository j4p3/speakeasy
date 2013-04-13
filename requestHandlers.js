//  modules
var formidable = require('formidable');
var fs = require('fs');
var log = require('./log');

//  render views
function render(response, view) {
  log.enter("RENDER " + view, "RH");
  fs.readFile('views/' + view + '.html', function(err, data) {
    if (err) throw err;
    response.writeHead(200, {"Content-Type": "text/html"});
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
  render(response, 'index');
}

function call(response, request, client) {
  log.enter("CALL", "RH");

  //  get number
  var form = new formidable.IncomingForm();
  form.parse(request, function(error, fields, files) {
    //  call number
    client.makeCall({
      to: fields.number,
      from: "+16572015873",
      url: "http://j4p3.com"},
      function(err, res) {
        log.enter("RESPONSE " + res.status, "RH");
    });
  });

  //  redirect to call page
  response.writeHead(302, {"Location": "post_call"});
  response.end();
}

function postCall(response, request) {
  //  render post-call page
  log.enter("POST-CALL", "RH");
  render(response, 'post_call');
}

//  exports
exports.home = home;
exports.call = call;
exports.post_call = postCall;
exports.favicon = favicon;
