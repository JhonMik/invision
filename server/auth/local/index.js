const passport = require('passport');
const jwt = require('jsonwebtoken');

const localModule = {};

localModule.authenticate = function (req, res, next) {

  if (!req.body.uuid) {
    return res.status(401).send({message: 'FTX authentication must be completed first.'});
  }

  passport.authenticate('local', function (err, user, info) {
    if (err || info) {
      return res.status(401).send(err || info);
    }

    if (!user) {
      return res.status(404).send(err || info);
    }

    let token = jwt.sign({
      user: {
        _id: user._id,
        name: user.email,
        uuid: req.body.uuid
      },
      subject: user._id
    }, 'secret', { expiresIn: '1h' });

    return res.status(200).send({
      token: token,
    });
  })(req, res, next)
};

localModule.adminAuthenticate = function (req, res, next) {
  if (req.body.password != process.env.ADMIN_PASSWORD) {
    return res.status(401).send({message: 'Admin Password Incorrect'});
  }
  let token = jwt.sign({
    subject: req.body.password
  }, 'secret', { expiresIn: '1h' });

  return res.status(200).send({
    token: token,
  });
};

module.exports = localModule;
