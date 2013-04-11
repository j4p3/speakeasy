var assert = require("assert"),
  request = require('request');

describe('server', function() {
  console.log("server suite");
  it('should respond to requests', function(done) {
    console.log("request spec");
    request.get('http://localhost:8888/', function(error, response, body) {
      console.log("response received");
      console.log(response.statusCode);
      response.statusCode.should.equal(200);
      done();
    });
  });
});