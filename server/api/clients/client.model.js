const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypto = require('crypto');

const ClientSchema = new Schema({
  email: {
    type: String,
    lowercase: true
  },
  uuid: String,
  creditModel: String,
  jekyllUserData: Schema.Types.Mixed,
  hashedPassword: String,
  salt: String,
  updatedAt: {
    type: Date,
    default: new Date()
  },
  createdAt: {
    type: Date,
    default: new Date()
  }
});

ClientSchema
  .virtual('password')
  .set(function (password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashedPassword = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

ClientSchema
  .virtual('token')
  .get(function () {
    return {
      '_id': this._id
    };
  });

ClientSchema.statics.getCreditModelList = function () {
  return {
    'ftx-model': 'FTX Model',
    'ml-model-b': 'ML Model B',
    'ml-model-c': 'ML Model C',
    'other-model': 'Other Model',
  };
}

ClientSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

ClientSchema.methods = {
  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashedPassword;
  },

  makeSalt: function () {
    return crypto.randomBytes(16).toString('base64');
  },

  encryptPassword: function (password) {
    if (!password || !this.salt) {
      return '';
    } else {
      let salt = Buffer.alloc(16, this.salt, 'base64');
      return crypto.pbkdf2Sync(password, salt, 10000, 16, 'sha1').toString('base64');
    }
  }
};

// API consumers don't want to see these fields
ClientSchema.options.toJSON = {
  transform: function (doc, ret, options) {
    // delete ret._id; // Removed comment by Dmitry. (Why is this field should be hidden?)
    delete ret.__v;
    delete ret.hashedPassword;
    delete ret.salt;
    return ret;
  }
};

module.exports = mongoose.model('Client', ClientSchema);
