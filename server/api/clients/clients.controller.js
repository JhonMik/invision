const Client = require('./client.model.js');

const controller = {
  getClients: async function(req, res) {
    // TODO: Need authorication algorithm for giving permission to admin only
    Client.find({}, function(err, clients) {
      res.json(clients);
    });
  },
  getCurrentClientInfo: async function(req, res) {
    Client.findOne({uuid: req.body.uuid}).then(client => {
      res.json(client.jekyllUserData);
    });
  },
  getClientsInLocal: async function(req, res) {
    // TODO: admin permission check

    Client.find({}, function(err, clients) {
      if (err) {
        console.log(err);
        res.json([]);
      } else {
        res.json(clients);
      }
    });
  },
  getClientInLocalById: async function(req, res) {
    // TODO: admin permission check

    Client.findOne({_id: req.params.id}, function(err, client) {
      if (err) {
        console.log(err);
        res.json([]);
      } else {
        res.json(client);
      }
    });
  },
  getCreditModelList: async function(req, res) {
    var creditModels = Client.getCreditModelList();
    res.json(creditModels);
  },
  updateClient: async function(req, res) {
    Client.findOneAndUpdate({_id: req.params.id}, req.body, function(err, oneClient) {
      if (err) {
        res.json({success: false});
      } else {
        res.json({success: true});
      }
    });
  },
};

module.exports = controller;