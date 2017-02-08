'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var RegistrationSchema = new mongoose.Schema({
    name: String,
    company: String,
    email: String,
    phone: String,
    size: String,
    message: String,
    date : {type: Date, default: Date.now},
    ticketSent: {type: Boolean, default: false}
});

export default mongoose.model('Registration', RegistrationSchema);
