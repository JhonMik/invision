const { MongoError } = require('mongodb');

function CustomError(name, message) {
  this.name = name;
  this.message = message;
  this.stack = (new Error()).stack;
  this.prototype = new Error;
}

module.exports = {
  CustomError,

  asyncMiddleware: function (fn) {
    return function(req, res, next) {
      fn(req, res, next).catch(next);
    };
  },

  handleCustomError: function (error, req, res, next) {
    if (error instanceof CustomError) {
      let status = 400;
      switch (error.name) {
        case 'AuthError':
          status = 401;
          break;
        case 'NoLocalUserError':
          status = 404;
          break;
        case 'JekyllError':
        case 'InternalError':
          status = 500;
          break;
      }
      return res.status(status).json({
        name: error.name,
        message: error.message
      });
    }
    next(error);
  },

  handleDatabaseError: function (error, req, res, next) {
    if (error instanceof MongoError) {
      return res.status(503).json({
        name: 'MongoError',
        message: error.message
      });
    }
    next(error);
  },
}