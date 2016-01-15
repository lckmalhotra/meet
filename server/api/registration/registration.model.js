'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var RegistrationSchema = new mongoose.Schema({
    name: String,
    company: String,
    email: String,
    phone: String,
    message: String,
    ticketSent: {type: Boolean, default: false}
});

export default mongoose.model('Registration', RegistrationSchema);
