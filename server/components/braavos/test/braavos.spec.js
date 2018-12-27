require('dotenv').config({ path: process.env.PROJECT_DIR+'/.env.development' });
const assert = require('assert');
var braavos = null;

describe('Braavos SDK', function() {
  this.timeout(60000);
  before(function () {
    if (!process.env.PROJECT_DIR || !process.env.TEST_UUID) {
      throw new Error('Must pass environment variables PROJECT_DIR and TEST_UUID');
    } else {
      braavos = require(`${process.env.PROJECT_DIR}/server/components/braavos`);
    }
  });
  describe('#getBankAccounts()', function() {
    it('should reject invalid uuid formats', function(done) {
      braavos.getBankAccounts('baduuid').catch(function (err) {
        assert.equal(err.message, 'Invalid owner ID');
        done();
      })
    });
    it('should return a promise', function() {
      assert.ok(typeof braavos.getBankAccounts(process.env.TEST_UUID).then === 'function');
    });
    it('should resolve with a response containing accounts or error', function(done) {
      braavos.getBankAccounts(process.env.TEST_UUID).then(function(response) {
        assert.ok('accounts' in response || 'error' in response);
        done();
      })
    });
  });
  describe('#getCustomers()', function() {
    it('should reject invalid uuid formats', function(done) {
      braavos.getCustomers('baduuid').catch(function (err) {
        assert.equal(err.message, 'Invalid owner ID');
        done();
      })
    });
    it('should return a promise', function() {
      assert.ok(typeof braavos.getCustomers(process.env.TEST_UUID).then === 'function');
    });
    it('should resolve with a response containing customers or error', function(done) {
      braavos.getCustomers(process.env.TEST_UUID).then(function(response) {
        assert.ok('customers' in response || 'error' in response);
        done();
      })
    });
  });
  describe('#getInvoices()', function() {
    it('should reject invalid uuid formats', function(done) {
      braavos.getInvoices('baduuid').catch(function (err) {
        assert.equal(err.message, 'Invalid owner ID');
        done();
      })
    });
    it('should return a promise', function() {
      assert.ok(typeof braavos.getInvoices(process.env.TEST_UUID).then === 'function');
    });
    it('should resolve with a response containing invoices or error', function(done) {
      braavos.getInvoices(process.env.TEST_UUID).then(function(response) {
        assert.ok('invoices' in response || 'error' in response);
        done();
      })
    });
  });
  describe('#getCompanyInfo()', function() {
    it('should reject invalid uuid formats', function(done) {
      braavos.getCompanyInfo('baduuid').catch(function (err) {
        assert.equal(err.message, 'Invalid owner ID');
        done();
      })
    });
    it('should return a promise', function() {
      assert.ok(typeof braavos.getCompanyInfo(process.env.TEST_UUID).then === 'function');
    });
    it('should resolve with a response containing company or error', function(done) {
      braavos.getCompanyInfo(process.env.TEST_UUID).then(function(response) {
        assert.ok('company' in response || 'error' in response);
        done();
      })
    });
  });
});
