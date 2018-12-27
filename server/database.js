const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

mongoose.set('debug', true);

mongoose.connection.on('connected', () => {
  console.log(`Mongoose connected to ${process.env.MONGODB_URI}`)
});

mongoose.connection.on('error', (err) => {
  console.error(err);
  process.exit();
});

module.exports = mongoose.connect(process.env.MONGODB_URI);

// The following version will be appropriate for newer versions of MongoDB:
// module.exports = mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useCreateIndex: true });
