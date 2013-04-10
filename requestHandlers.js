//  modules
var formidable = require('formidable');
var fs = require('fs');

//  views - not very useful at the moment
var index = require('./index');
var pages = {};
pages[index] = index;
//  pages[done] = done;

//  handlers
function favicon(response, request) {
  response.writeHead(200, {'Content-Type': 'image/x-icon'} );
  response.end();
}

function home(response, request) {
  console.log("request handler home active");
  fs.readFile('./index.html', function(err, data) {
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(data);
    response.end();
  });
}

function createUser(response, request, client) {
  console.log("request handler createUser active");
  //  get number of user
  console.log("parsing number");
  var form = new formidable.IncomingForm();
  form.parse(request, function(error, fields, files) {

    //  create capability token for user
    // var capability = new Twilio.Capability();
    // capability.allowClientOutgoing('AP517d641cc40efc7586a74565a62794d1');


    //  call user
    console.log("calling number "+ fields.number);
    client.makeCall({
      to: fields.number,
      from: "+16572015873",
      url: "http://j4p3.com"},
      function(err, res) {
        console.log("call made with response data");
        console.log(res);
      }
    )
  });
}

//  exports
exports.home = home;
exports.createUser = createUser;
exports.favicon = favicon;