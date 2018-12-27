const jwt = require('jsonwebtoken');
const ExtractJwt = require('passport-jwt').ExtractJwt;

module.exports = {
  getCurrentUuid: function(req, res, next) {
    req.body.uuid = jwt.verify(ExtractJwt.fromAuthHeaderAsBearerToken()(req), 'secret').user.uuid;
    next();
  }
}