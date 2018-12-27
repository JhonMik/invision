'use strict'
/**
 * Segment interface module.
 * @module components/segment
 */

const segmentAnalytics = require('analytics-node');
const slack = require('slack-notify')(process.env.SLACK_NOTIFICATION_URI);

/* Use or create Segment instance.  Flush each message through as it is submitted (during development). */
let Segment = null;
function getSegment() {
  return Segment || (Segment = new segmentAnalytics(process.env.SERVER_SEGMENT_WRITE_KEY, { flushAt: 1 }));
}

module.exports = {
/**
 * Identify a user and send an email.
 * @param {string} uuid - 40-character hexadecimal unique identifier.
 * @param {string} email - email address.
 * @param {string} invoiceEvent - Event descriptor.  By convention, a noun followed by past tense verb.
 * @param {object} properties - Event-dependent properties payload.
 */
identifyUserAndSendEmail: function(uuid, email, invoiceEvent, properties) {
  // Make sure userId is unique in the multiple-recipient case
  uuid += ('/' + email);
  if (process.env.TEST_EMAIL) email = process.env.TEST_EMAIL;
  getSegment().identify({ userId: uuid, traits: {email: email} }, this.trackEvent(uuid, invoiceEvent, properties));
},

/**
 * Track an event using Segment.
 * @param {string} uuid - 40-character hexadecimal unique identifier.
 * @param {string} eventDescriptor - By convention, a noun followed by past tense verb.
 * @param {object} properties - Event-dependent properties payload.
 */
trackEvent: function(uuid, eventDescriptor, properties) {
  // for testing: check_id lets us send duplicates within a short time frame
  properties = {...properties, extras: {check_id: Date.now()}};

  // logging for unsolved problem: Segment events sometimes get dropped
  console.log('segment track:', { userId: uuid, event: eventDescriptor, properties: properties });
  getSegment().track({ userId: uuid, event: eventDescriptor, properties: properties }, () => {
    console.log('segment track callback');
  });
  console.log('after segment track');

  const eventPhrase = eventDescriptor.split('_').map(word => { return word.replace(word[0], word[0].toUpperCase()); }).join(' ');
  slack.send({ username: null, icon_emoji: null, text: `${eventPhrase}, client "${properties.client.company_name}"` });

}
}

