//  modules
var formidable = require('formidable');
var fs = require('fs');

// //  views - not very useful at the moment
// var index = require('views/index.html');
// var call = require('views/call.html')
// var pages = {};
// pages[index] = index;
// pages[call] = call;
//  screw views - handle this in express later

//  handlers
function favicon(response, request) {
  response.writeHead(200, {'Content-Type': 'image/x-icon'} );
  response.end();
}

function home(response, request) {
  //  render index page
  console.log("request handler home active");
  fs.readFile('views/index.html', function(err, data) {
    if (err) throw err;
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(data);
    response.end();
  });
}

function call(response, request, client) {
  console.log("request handler call active");

  //  get number
  console.log("parsing number");
  var form = new formidable.IncomingForm();
  form.parse(request, function(error, fields, files) {
    //  call number
    console.log("calling number " + fields.number);
    client.makeCall({
      to: fields.number,
      from: "+16572015873",
      url: "http://j4p3.com"},
      function(err, res) {
        console.log("call made with response data: ");
        console.log("  " + res.status);
        console.log("  " + res.message);
    });
  });

  //  redirect to call page
  console.log("rendering call page");
  response.writeHead(302, {"Location": "post_call"});
  response.end();
}

function postCall(response, request) {
  //  render post-call page
  console.log("request handler home active");
  fs.readFile('views/post_call.html', function(err, data) {
    if (err) throw err;
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(data);
    response.end();
  });
}

//  exports
exports.home = home;
exports.call = call;
exports.post_call = postCall;
exports.favicon = favicon;
