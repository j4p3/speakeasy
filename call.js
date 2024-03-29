//  debug
// jslint node: true
"use strict";

var twilio = require('twilio');
var log = require('./log');

function init(callScript) {
  callScript.gather({
    action: '/call',
    method: 'POST',
    numDigits: '1'
  }, function () {
    this.say('Welcome. Press 1 to request a translation. Press 2 to offer a translation.', {voice: 'woman', language: 'en-gb'});
  });

  return callScript;
}

function gather(callScript, digits) {
  log.enter("GATHER, SELECTION = " + digits, "CALL");
  if (digits == 1) {
    log.enter("REQUEST TRANSLATION", "CALL");
    callScript.gather({
      action: '/translator',
      method: 'GET',
      numDigits: '1'
    }, function () {
      this.say('You have selected to request a translation. Press 1 for Spanish. Press 2 for Creole.', {voice: 'woman', language: 'en-gb'});
    });
  } else if (digits == 2) {
    log.enter("PROVIDE TRANSLATION", "CALL");
    callScript.gather({
      action: '/translator',
      method: 'POST',
      numDigits: '1'
    }, function () {
      this.say('You have selected to provide a translation. Press 1 if you speak Spanish. Press 2 if you speak Creole.', {voice: 'woman', language: 'en-gb'});
    });
  } else {
    callScript.say('Invalid entry.');
    init(callScript);
  }

  return callScript;
}

function forward(callScript, translator) {
  translator = translator || '4242591337';

  callScript.say('Thank you. Your callScript is being forwarded to a translator.')
    .dial(translator);

  return callScript;
}

function exit(callScript) {
  callScript.say('Thank you for participating. Your phone number has been added to our database.');
}

exports.init = init;
exports.gather = gather;
exports.forward = forward;
exports.exit = exit;
