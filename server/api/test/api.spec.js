require('dotenv').config({ path: process.env.PROJECT_DIR+'/.env.development' });
const axios = require('axios');
const assert = require('assert');
let api = null;
let token = null;

describe('api', function() {
  this.timeout(60000);
  before(function () {
    if (!process.env.PROJECT_DIR || !process.env.SERVER_ADDRESS || !process.env.TEST_EMAIL || !process.env.TEST_PASSWORD) {
      throw new Error('Must pass environment variables PROJECT_DIR, SERVER_ADDRESS, TEST_EMAIL and TEST_PASSWORD');
    }
    api = axios.create({
          baseURL: process.env.SERVER_ADDRESS
        });
    return api.request({method: 'post',
              url: '/auth/local', 
              data: { 'email': process.env.TEST_EMAIL, 'password': process.env.TEST_PASSWORD }})
    .then(result => {
      if (!result.data.token) {
        throw new Error("Authorization failed.  Aborting tests.");
      }
      token = result.data.token;
    });
  });
  describe('customers', function() {
    it('returns a 401 status if token not set', function() {
      return api.request({method: 'get', url: '/api/customers'})
      .catch(result => {
        assert.ok(result.response.status == 401);
      });
    });
    it('returns an array of customer data', function() {
      return api.request({method: 'get', url: '/api/customers', headers: {'Authorization': 'Bearer ' + token}})
      .then(result => {
        assert.ok(result.status == 200);
        assert.ok(Array.isArray(result.data));
        if (result.data.length > 0) {
          assert.ok(result.data[0].contactName);  // an arbitrary field from customers data
        }
      });
    });
  });
  describe('invoices', function() {
    let invoiceId = null;
    
    it('returns a 401 status if token not set', function() {
      return api.request({method: 'get', url: '/api/invoices'})
      .catch(result => {
        assert.ok(result.response.status == 401);
      });
    });
    it('returns an array of invoice data', function() {
      return api.request({method: 'get', url: '/api/invoices', headers: {'Authorization': 'Bearer ' + token}})
      .then(result => {
        assert.ok(result.status == 200);
        assert.ok(Array.isArray(result.data));
        if (result.data.length > 0) {
          assert.ok(result.data[0].balance);  // an arbitrary field from invoice data
          invoiceId = result.data[0].id;  // for the next test (single invoice)
        }
      });
    });
    it('returns a single invoice on request', function() {
      if (!invoiceId) {
        this.skip();
      }
      return api.request({method: 'get', url: '/api/invoices/' + invoiceId, headers: {'Authorization': 'Bearer ' + token}})
      .then(result => {
        assert.ok(result.status == 200);
        assert.ok(result.data[0].balance);  // an arbitrary field from invoice data
      });
    });
  });
  describe('dashboard', function() {
    describe('summary', function() {
      it('returns a 401 status if token not set', function() {
        return api.request({method: 'get', url: '/api/dashboard/summary'})
        .catch(result => {
          assert.ok(result.response.status == 401);
        });
      });
      it('returns a set of summary data', function() {
        return api.request({method: 'get', url: '/api/dashboard/summary', headers: {'Authorization': 'Bearer ' + token}})
        .then(result => {
          assert.ok(result.status == 200);
          assert.ok(result.data.unpaidInvoicesCount);  // an arbitrary field from summary data
        });
      });
    });
    describe('recently funded invoices', function() {
      it('is currently stubbed with an unavailable message', function() {
        return api.request({method: 'get', url: '/api/dashboard/funded', headers: {'Authorization': 'Bearer ' + token}})
        .then(result => {
          assert.ok(result.status == 200);
          assert.ok(result.data[0].customer === 'Funded Status Unavailable');
        });
      });
    });
    describe('recently paid invoices', function() {
      it('returns a 401 status if token not set', function() {
        return api.request({method: 'get', url: '/api/dashboard/paid'})
        .catch(result => {
          assert.ok(result.response.status == 401);
        });
      });
      it('returns a 400 status if days parameter not set correctly', function() {
        return api.request({method: 'get', url: '/api/dashboard/paid?days=x', headers: {'Authorization': 'Bearer ' + token}})
        .catch(result => {
          assert.ok(result.response.status == 400);
        });
      });
      it('returns a 200 status if days parameter set correctly', function() {
        return api.request({method: 'get', url: '/api/dashboard/paid?days=30', headers: {'Authorization': 'Bearer ' + token}})
        .then(result => {
          assert.ok(result.status == 200);
        });
      });
      it('returns a 200 status if days parameter omitted', function() {
        return api.request({method: 'get', url: '/api/dashboard/paid', headers: {'Authorization': 'Bearer ' + token}})
        .then(result => {
          assert.ok(result.status == 200);
        });
      });
      it('returns an array of invoice data', function() {
        return api.request({method: 'get', url: '/api/dashboard/paid', headers: {'Authorization': 'Bearer ' + token}})
        .then(result => {
          assert.ok(result.status == 200);
          assert.ok(Array.isArray(result.data));
          if (result.data.length > 0) {
            assert.ok(result.data[0].customer);  // an arbitrary field from invoice data
          }
        });
      });
    });
  });

});