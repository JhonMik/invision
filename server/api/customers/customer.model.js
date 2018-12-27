const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
  id: {
  	type: String,
  	unique : true, 
  	required : true, 
  	dropDups: true,
  	lowercase: true
  },
  email: {
  	type: String,
  	lowercase: true
  },
  name: String,
  company: String,
  contact_name: String,
  updatedAt: {
    type: Date,
    default: new Date()
  },
  createdAt: {
    type: Date,
    default: new Date()
  }
});

CustomerSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model('Customer', CustomerSchema);