
const express = require('express');
const passport = require('passport');
const router = express.Router();
const controller = require('./invoices.controller');
const tokenData = require('../../components/tokenData');
const {asyncMiddleware} = require('../../error_handling');

router.get('/bytoken/:token', asyncMiddleware(controller.getInvoiceByToken));
router.get('/:id', passport.authenticate('jwt'), tokenData.getCurrentUuid, asyncMiddleware(controller.getInvoice));
router.get('/', passport.authenticate('jwt'), tokenData.getCurrentUuid, asyncMiddleware(controller.getInvoices));
router.post('/getbyclient', passport.authenticate('jwt'), asyncMiddleware(controller.getInvoices));
router.post('/inlocal/byclient', passport.authenticate('jwt'), tokenData.getCurrentUuid, asyncMiddleware(controller.getInvoicesInLocalByClientUuid));
router.post('/inlocal/bycustomer', passport.authenticate('jwt'), tokenData.getCurrentUuid, asyncMiddleware(controller.getInvoicesInLocalByCustomerEmail));
router.post('/:id/payment/overdue', passport.authenticate('jwt'), tokenData.getCurrentUuid, asyncMiddleware(controller.paymentOverdue));
router.put('/:id/verification/status/bypayor/:status', asyncMiddleware(controller.verificationSetStatus));
router.put('/:id/verification/status/byadmin/:status', passport.authenticate('jwt'), asyncMiddleware(controller.verificationSetStatus));
router.put('/:id/verification/status/:status', passport.authenticate('jwt'), tokenData.getCurrentUuid, asyncMiddleware(controller.verificationSetStatus));
router.put('/:id/payor/inform', passport.authenticate('jwt'), tokenData.getCurrentUuid, asyncMiddleware(controller.informPayor));

module.exports = router;
