//  debug
// jslint node: true
"use strict";

//  modules
var fs = require('fs');
var qs = require('querystring');
var sys = require('sys');
var log = require('./log');
//  potentially separate twilio-specific modules so they don't load on browser hits
var twilio = require('twilio');
var callActions = require('./call');

//  render views
function render(response, view, type) {
  type = type || 'html';

  log.enter("RENDER " + view, "RH");
  fs.readFile(view + '.' + type, function (err, data) {
    if (err) { throw err; }
    response.writeHead(200, {"Content-Type": "text/" + type});
    response.write(data);
    response.end();
  });
}

//  handlers
function favicon(response, request) {
  //  prevent 404 on obnoxious double request for favicon
  response.writeHead(200, {'Content-Type': 'image/x-icon'});
  response.end();
}

function home(response, request) {
  //  render index page
  log.enter("HOME", "RH");
  render(response, 'views/index');
}

function call(response, request, client) {
  log.enter("CALL", "RH");

  if (request.method === "GET") {
    //  TWILIO REQUESTING INITIAL CALL SCRIPT
    log.enter("- NEW CALL REQUEST", "RH");

    var greeting = new twilio.TwimlResponse();
    response.writeHead(200, {"Content-type": "text/xml"});
    response.write(callActions.init(greeting).toString());
    response.end();

  } else if (request.method === "POST") {
    //  TWILIO SENDING DATA FROM INITIAL CALL SCRIPT
    request.body = "";
    request.on('data', function (chunk) {
      request.body += chunk;
    });
    request.on('end', function () {
      log.enter("- NEW CALL POSTING DATA", "RH");
      log.enter("- request.body: " + JSON.stringify(qs.parse(request.body)), "RH");

      var digits = qs.parse(request.body).digits;
      var getInfo = new twilio.TwimlResponse();

      response.writeHead(200, {"Content-type": "text/xml"});
      response.write(callActions.gather(getInfo, digits).toString());
      response.end();
    });
  }
}

//  exports
exports.home = home;
exports.call = call;
exports.favicon = favicon;
