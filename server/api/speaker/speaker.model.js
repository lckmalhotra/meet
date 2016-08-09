'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var SpeakerSchema = new mongoose.Schema({
    name: String,
    company: String,
    experience: String,
    biography: String,
    abstract: String,
    date : {type: Date, default: Date.now},
    ticketSent: {type: Boolean, default: false}
});

export default mongoose.model('Speakers', SpeakerSchema);
