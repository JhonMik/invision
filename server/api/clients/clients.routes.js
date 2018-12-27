
const express = require('express');
const passport = require('passport');
const controller = require('./clients.controller');
const router = express.Router();
const tokenData = require('../../components/tokenData');
const {asyncMiddleware} = require('../../error_handling');

// router.get('/:id', passport.authenticate('jwt'), controller.getUser);
router.put('/:id/update', passport.authenticate('jwt'), controller.updateClient);
// router.post('/', controller.createUser);
router.get('/', passport.authenticate('jwt'), tokenData.getCurrentUuid, asyncMiddleware(controller.getClients));
router.get('/current_info', passport.authenticate('jwt'), tokenData.getCurrentUuid, asyncMiddleware(controller.getCurrentClientInfo));
router.get('/credit_model_list', passport.authenticate('jwt'), tokenData.getCurrentUuid, asyncMiddleware(controller.getCreditModelList));
router.get('/inlocal/', passport.authenticate('jwt'), tokenData.getCurrentUuid, asyncMiddleware(controller.getClientsInLocal));
router.get('/inlocal/:id', passport.authenticate('jwt'), tokenData.getCurrentUuid, asyncMiddleware(controller.getClientInLocalById));
module.exports = router;
