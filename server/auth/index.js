const express = require('express');
const local = require('./local');
const ftx = require('./ftx');
const router = express.Router();
const {asyncMiddleware} = require('../error_handling');

require('./passport').setup();

router.get('/auto_ftx', asyncMiddleware(ftx.nzfeAutoAuthenticate));
router.post('/local', asyncMiddleware(ftx.authenticate), local.authenticate);
router.post('/admin', local.adminAuthenticate);

module.exports = router;
