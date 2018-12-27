require('dotenv').config({ path: process.env.PROJECT_DIR+'/.env.development' });
const axios = require('axios');
const assert = require('assert');
let auth = null;

describe('/auth/local', function() {
  this.timeout(60000);
  before(function () {
    if (!process.env.SERVER_ADDRESS || !process.env.TEST_EMAIL || !process.env.TEST_PASSWORD) {
      throw new Error('Must pass environment variables SERVER_ADDRESS, TEST_EMAIL and TEST_PASSWORD');
    }
    auth = axios.create({
          baseURL: process.env.SERVER_ADDRESS
        });
  });
  it('returns a token on successful login', function(done) {
      auth.request({method: 'post',
                url: '/auth/local', 
                data: { 'email': process.env.TEST_EMAIL, 'password': process.env.TEST_PASSWORD }})
      .then(result => {
        assert.ok(result.data.token);
        done();
      });
  });
  it('returns a 401 status on unsuccessful login', function(done) {
    auth.request({method: 'post',
              url: '/auth/local', 
              data: { 'email': process.env.TEST_EMAIL, 'password': 'bad password' }})
    .catch(result => {
      assert.ok(result.response.status == 401);
      done();
    });
  });
  describe('creates a local user (if it does not exist) and performs local authentication', function() {
    it('this functionality will be tested if necessary');
  });
});