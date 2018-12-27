const eh = require('./error_handling');
const path = require('path');

module.exports = function(app) {
  app.use('/auth', require('./auth'));
  app.use('/api/clients', require('./api/clients/clients.routes.js'));
  app.use('/api/invoices', require('./api/invoices/invoices.routes.js'));
  app.use('/api/customers', require('./api/customers/customers.routes.js'));
  app.use('/api/dashboard', require('./api/dashboard/dashboard.routes.js'));

  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '/../dist/index.html'));
  });

  app.use('*', [eh.handleCustomError, eh.handleDatabaseError]);
}
