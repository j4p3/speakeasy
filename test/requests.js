var assert = require('assert'),
  request = require('request');

describe('server', function() {

  describe('requests with valid HTTP type', function() {
    describe('directed at a valid URI', function() {
      it('should respond 200 for GET "/" ', function(done) {
        request.get('http://localhost:8888/', function(error, response, body) {
          assert.equal(response.statusCode, 200);
          done();
        });
      });

      it('should redirect 302 for POST "/call" ', function(done) {
        request.post({
          url: 'http://localhost:8888/call',
          body: "number=5555"
        }, function(error, response, body) {
          assert.equal(response.statusCode, 302);
          done()
        });
      });
    });

    describe('directed at an invalid URI', function() {
      it('should respond with statusCode 404 for GET "random" ', function(done) {
        request.get('http://localhost:8888/random', function(error, response, body) {
          assert.equal(response.statusCode, 404);
          done();
        });
      });
    });
  });

  describe('requests with invalid HTTP type', function() {
    describe('directed at a valid URI', function() {
      it('should not allow POST "/" ');
    });

    describe('directed at an invalid URI', function() {
      it('should respond with statusCode 404 for "random" ');
    });
  });

});