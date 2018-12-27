
const express = require('express');
const passport = require('passport');
const router = express.Router();
const controller = require('./dashboard.controller');
const tokenData = require('../../components/tokenData');
const {asyncMiddleware} = require('../../error_handling');

router.get('/summary', passport.authenticate('jwt'), tokenData.getCurrentUuid, asyncMiddleware(controller.getInvoiceSummary));
router.get('/funded', passport.authenticate('jwt'), tokenData.getCurrentUuid, asyncMiddleware(controller.getRecentlyFunded));
router.get('/paid', passport.authenticate('jwt'), tokenData.getCurrentUuid, asyncMiddleware(controller.getRecentlyPaid));
router.post('/email/:invoiceEvent/:uuid', passport.authenticate('jwt'), tokenData.getCurrentUuid, asyncMiddleware(controller.triggerEmail));

module.exports = router;
