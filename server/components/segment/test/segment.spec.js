require('dotenv').config({ path: process.env.PROJECT_DIR+'/.env.development' });
const assert = require('assert');
var segment = null;

describe('Segment SDK', function() {
  this.timeout(60000);
  before(function () {
    if (!process.env.PROJECT_DIR || !process.env.TEST_UUID) {
      throw new Error('Must pass environment variables PROJECT_DIR and TEST_UUID');
    } else {
      segment = require(`${process.env.PROJECT_DIR}/server/components/segment`);
    }
  });
  describe('trackEvent()', function() {
    it("doesn't throw an error", function() {
      segment.trackEvent(process.env.TEST_UUID, 'Event Triggered', {reason: 'test', rhyme: 'quest'});
    });
  });
});
