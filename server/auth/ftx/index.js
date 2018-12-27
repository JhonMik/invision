const jekyll = require('../../components/jekyll');
const Client = require('../../api/clients/client.model.js');
const Slack = require('slack-notify')(process.env.SLACK_NOTIFICATION_URI);
const jwt = require('jsonwebtoken');
const { CustomError } = require('../../error_handling');

module.exports = {

  authenticate: async function (req, res, next) {
    if (!req.body.email || !req.body.password) {
      throw new CustomError('SignInError', 'Email and password required.');
    } else {
      return jekyll.signIn(req.body.email, req.body.password)
        .then(async jekyllRes => {
          if (jekyllRes.uuid) {
            let oneClient = await Client.findOne({ uuid: jekyllRes.uuid });
            if (!oneClient) {
              oneClient = new Client;
              oneClient.email = jekyllRes.email;
              oneClient.uuid = jekyllRes.uuid;
              oneClient.creditModel = 'ftx-model';
              oneClient.jekyllUserData = jekyllRes;
              await oneClient.save(oneClient);
              // Had trouble appropriately filtering Segment logging to Slack. Using this direct method instead.  May revisit this later.
              // Segment.trackEvent(oneClient.uuid, 'NZFE Signup', {email: oneClient.email, creditModel: oneClient.creditModel, uuid: oneClient.uuid});
              Slack.send({
                username: null, icon_emoji: null,
                text: `New client signed up with email ${oneClient.email}, credit model ${oneClient.creditModel}, assigned uuid ${oneClient.uuid}`
              });
            } else if (!oneClient.jekyllUserData) {
              // enhance this old client record that doesn't have all the data yet
              oneClient.jekyllUserData = jekyllRes;
              await oneClient.save(oneClient);
            }
            req.body.uuid = jekyllRes.uuid; // pass the uuid along to next middleware
            next();
          } else if (jekyllRes.response && jekyllRes.response.status) {
            res.status(jekyllRes.response.status).send(jekyllRes.response.data);
          } else {
            throw new CustomError('JekyllError', jekyllRes);
          }
        })
    }
  },

  nzfeAuthenticate: function (req, res, next) {
    if (!req.query.uuid) {
      throw new CustomError('NZFEAuthError', 'uuid required.');
    } else {
      return jekyll.nzfeAuth(req.query.uuid)
        .then(jekyllRes => {
          if (jekyllRes.uuid) {
            next();
          } else if (jekyllRes.response && jekyllRes.response.status) {
            res.status(jekyllRes.response.status).send(jekyllRes.response.data);
          } else {
            throw new CustomError('JekyllError', jekyllRes);
          }
        })
    }
  },

  nzfeAutoAuthenticate: async function (req, res, next) {
    if (!req.query.uuid) {
      throw new CustomError('NZFEAuthError', 'uuid required.');
    } else {
      return jekyll.nzfeAuth(req.query.uuid)
        .then(async jekyllRes => {
          if (jekyllRes.uuid) {
            let oneClient = await Client.findOne({ uuid: jekyllRes.uuid });
            if (!oneClient) {
              oneClient = new Client;
              oneClient.email = jekyllRes.email;
              oneClient.uuid = jekyllRes.uuid;
              oneClient.creditModel = 'ftx-model';
              oneClient.jekyllUserData = jekyllRes;
              await oneClient.save(oneClient);
              // Had trouble appropriately filtering Segment logging to Slack. Using this direct method instead.  May revisit this later.
              // Segment.trackEvent(oneClient.uuid, 'NZFE Signup', {email: oneClient.email, creditModel: oneClient.creditModel, uuid: oneClient.uuid});
              Slack.send({
                username: null, icon_emoji: null,
                text: `New client signed up with email ${oneClient.email}, credit model ${oneClient.creditModel}, assigned uuid ${oneClient.uuid}`
              });
            } else if (!oneClient.jekyllUserData) {
              // enhance this old client record that doesn't have all the data yet
              oneClient.jekyllUserData = jekyllRes;
              await oneClient.save(oneClient);
            }
            let token = jwt.sign({
              user: {
                _id: oneClient._id,
                name: oneClient.email,
                uuid: jekyllRes.uuid
              },
              subject: oneClient._id
            }, 'secret', { expiresIn: '1h' });

            return res.status(200).send({
              token: token,
            });

          } else if (jekyllRes.response && jekyllRes.response.status) {
            res.status(jekyllRes.response.status).send(jekyllRes.response.data);
          } else {
            throw new CustomError('JekyllError', jekyllRes);
          }
        })
    }
  }
};
