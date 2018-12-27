
const express = require('express');
const passport = require('passport');
const router = express.Router();
const controller = require('./customers.controller');
const tokenData = require('../../components/tokenData');
const {asyncMiddleware} = require('../../error_handling');

router.get('/', passport.authenticate('jwt'), tokenData.getCurrentUuid, asyncMiddleware(controller.getCustomers));
router.get('/inlocal/', passport.authenticate('jwt'), tokenData.getCurrentUuid, asyncMiddleware(controller.getCustomersInLocal));
router.get('/inlocal/:id', passport.authenticate('jwt'), tokenData.getCurrentUuid, asyncMiddleware(controller.getCustomerInLocalById));

module.exports = router;
