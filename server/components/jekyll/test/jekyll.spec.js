require('dotenv').config({ path: process.env.PROJECT_DIR+'/.env.development' });
const assert = require('assert');
var jekyll = null;

describe('Jekyll SDK', function() {
  this.timeout(60000);
  before(function () {
    if (!process.env.PROJECT_DIR || !process.env.TEST_EMAIL || !process.env.TEST_PASSWORD) {
      throw new Error('Must pass environment variables PROJECT_DIR, TEST_EMAIL and TEST_PASSWORD');
    } else {
      jekyll = require(`${process.env.PROJECT_DIR}/server/components/jekyll`);
    }
  });
  describe('#signIn()', function() {
    it('should return a promise', function() {
      assert.ok(typeof jekyll.signIn(process.env.TEST_EMAIL, process.env.TEST_PASSWORD).then === 'function');
    });
    it('should succeed with a response containing an object of user data', function(done) {
      jekyll.signIn(process.env.TEST_EMAIL, process.env.TEST_PASSWORD).then(function(result) {
        assert.ok(result.uuid);
        done();
      })
    });
    it('should fail with a 401 response', function(done) {
      jekyll.signIn(process.env.TEST_EMAIL, 'bad password')
      .then(function(result) {
        assert.ok(result.response.status == 401);
        done();
      })
    });
  });
  describe('#validate()', function() {
    it('validate() may not be needed');
  });
  describe('#nzfeAuth()', function() {
    it('should return a promise', function() {
      assert.ok(typeof jekyll.nzfeAuth(process.env.TEST_UUID).then === 'function');
    });
    it('should succeed with a response containing an object of user data', function(done) {
      jekyll.nzfeAuth(process.env.TEST_UUID).then(function(result) {
        assert.ok(result.uuid);
        done();
      })
    });
    /*
    it('should fail with a 401 response', function(done) {
      jekyll.nzfeAuth('bad uuid')
      .then(function(result) {
        assert.ok(result.response.status == 401);
        done();
      })
    });
    */
  });
});
