'use strict';

import config from '../../config/environment';

var ejs = require("ejs"),
    maingunjs = require("mailgun-js")({apiKey: config.mailgun.apiKey, domain: config.mailgun.domain}),
    path = require("path"),
    EventEmitter = require("events").EventEmitter,
    Templates = require("./templates.enum"),
    fs = require("fs");

module.exports = {
    sendMailWithTemplate: function (sender, recipients, subject, template, model) {
        var templatePath = fs.readFileSync(path.join(__dirname, template), 'utf8'),
            messageHtml = ejs.render(templatePath, model),
            emitter = new EventEmitter();

        sendMail(sender, recipients, subject, messageHtml)
            .once("ERROR", function (err) {
                return emitter.emit("ERROR", err);
            })
            .once("SUCCESS", function (_recipients, subject) {
                return emitter.emit("SUCCESS", _recipients, subject);
            });

        return emitter;
    }
};


function sendMail(sender, recipients, subject, body, attachment) {
    var _recipients = [],
        emitter = new EventEmitter();

    _recipients = Array.isArray(recipients) ? recipients : [recipients];

    sender = sender || config.mailgun.sender;

    console.log("\nINFO: Sending mails to ", _recipients.toString());

    sendSingleMail(sender, _recipients.toString(), subject, body, attachment, function (err) {
        if (err) {
            console.error("Error sending mails", err, "for subject", subject, "recipients", _recipients);
            return emitter.emit("ERROR", err);
        } else {
            return emitter.emit("SUCCESS", [], subject);
        }
    });

    return emitter;
}

function sendSingleMail(sender, recipient, subject, body, attachment, callback) {
    var data = {
        from: sender,
        to: recipient,
        subject: subject,
        html: body
    };

    if(attachment) {
        data["attachment"] = attachment;
    }

    maingunjs.messages().send(data, function (err, body) {

        if(err) {
            return callback(err);
        }
        return callback(null, body);

    });
}