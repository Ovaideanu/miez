'use strict';

const mongoose = require('mongoose');
const User = require('./user').schema;
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

var ContactSchema = new Schema({
  email:  {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String
  },
  phone: {
    type: String,
  },
  city: {
    type: String,
  },
  company: {
    type: String,
  },
  user: {
    type: ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Contact', ContactSchema);
