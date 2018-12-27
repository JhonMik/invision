const passport = require('passport');
const Client = require('../api/clients/client.model.js');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const passportModule = {};

passportModule.setupLocalStrategy = function () {
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
  }, function (email, password, done) {
    Client.findOne({ email: email.toLowerCase() })
      .then(client => {
        // restored this part: this part is needed, as we need to save client's data on local db.
        if (!client) {
          client = new Client;
          client.email = email;
          client.password = password;
          client.save(client);
        }

        // ALERT!!! TEMPORARY QUICK FIX FOR PASSWORD RESET CASE!!!
        // We accept any password at this stage, because if we have reached this point, FTX authentication has succeeded.
        // This is necessary for now because we currently have no way of retrieving a changed password from FTX.
        client.password = password;


        if (!client.authenticate(password)) {
          return done(null, false, {
            message: 'This password is not correct.'
          });
        }
        
        return done(null, client);
      })
  }));
}

passportModule.setupJwtStrategy = function () {
  let options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'secret'
  }

  passport.use(new JwtStrategy(options, function (jwtPayload, done) {
    Client.findOne({ _id: jwtPayload.subject }, function (err, user) {
      if (err) {
        return done(err, false);
      }

      if (user) {
        if (!user.uuid) {
          user.uuid = jwtPayload.user.uuid;
          user.save();
        }
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  }));
}

passportModule.setup = function (user) {
  passportModule.setupLocalStrategy();
  passportModule.setupJwtStrategy();

  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (obj, done) {
    done(null, obj);
  });
};

module.exports = passportModule;
