'use strict';

// Production specific configuration
// =================================
module.exports = {
    // Server IP
    ip: process.env.OPENSHIFT_NODEJS_IP ||
    process.env.IP ||
    undefined,

    // Server port
    port: process.env.OPENSHIFT_NODEJS_PORT ||
    process.env.PORT ||
    8080,

    mailgun: {
        sender: "Frontend Conf <contact@fe-conf.com>",
        apiKey: process.env.MAILGUN_API_KEY || 'key-1682719577aa94ddf653546a867a7fa5',
        smtpLogin: "postmaster@fe-conf.com",
        domain: ( process.env.MAILGUN_DOMAIN || process.env.MAILGUN_SMTP_LOGIN || 'fe-conf.org'),
        overrideRecipients: true
    },

    // MongoDB connection options
    mongo: {
        uri: process.env.MONGOLAB_URI ||
        process.env.MONGOHQ_URL ||
        process.env.OPENSHIFT_MONGODB_DB_URL +
        process.env.OPENSHIFT_APP_NAME ||
        'mongodb://localhost/meet'
    }
};
