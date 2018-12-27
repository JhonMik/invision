require('dotenv').config();
process.env.STANDARD_TRANSACTION_FEE = 0.03;

require('./server/server.js');