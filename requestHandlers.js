//  debug
// jslint node: true
"use strict";

//  modules
var fs = require('fs');
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
    response.write(data)
      .end();
  });
}

//  handlers
function favicon(response, request) {
  //  prevent 404 on obnoxious double request for favicon
  response.writeHead(200, {'Content-Type': 'image/x-icon'})
    .end();
}

function home(response, request) {
  //  render index page
  log.enter("HOME", "RH");
  render(response, 'views/index');
}

function call(response, request, client) {
  log.enter("CALL", "RH");

  if (request.method === "GET") {
    //  TWILIO REQUESTING CALL SCRIPT
    var greeting = new twilio.TwimlResponse();
    response.writeHead(200, {"Content-type": "text/xml"})
      .write(callActions.init(greeting).toString())
      .end();

  } else if (request.method === "POST") {
    //  TWILIO SENDING DATA
    var getInfo = new twilio.TwimlResponse();
    response.writeHead(200, {"Content-type": "text/xml"})
      .write(callActions.gather(getInfo, response.digit).toString())
      .end();
  }
}

//  exports
exports.home = home;
exports.call = call;
exports.favicon = favicon;
