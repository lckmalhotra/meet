'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var ThingSchema = new mongoose.Schema({
  name: String,
  company: String,
  email: String,
  phone: String,
  message : String
});

export default mongoose.model('Thing', ThingSchema);
