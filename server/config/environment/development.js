'use strict';

// Development specific configuration
// ==================================
module.exports = {

  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/meet'
  },

  mailgun: {
    sender: "Frontend Conf <contact@fe-conf.com>",
    apiKey: process.env.MAILGUN_API_KEY || 'key-1682719577aa94ddf653546a867a7fa5',
    smtpLogin: "postmaster@sandboxd8fba3f161474a2fa41178b54e504847.mailgun.org",
    domain: ( process.env.MAILGUN_DOMAIN || process.env.MAILGUN_SMTP_LOGIN || 'sandboxd8fba3f161474a2fa41178b54e504847.mailgun.org'),
    overrideRecipients: true
  },

  // Seed database on startup
  seedDB: false

};
