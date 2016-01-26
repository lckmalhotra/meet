'use strict';

import config from '../../config/environment';

var ejs = require("ejs"),
    path = require("path"),
    nodemailer = require("nodemailer"),
    EventEmitter = require("events").EventEmitter,
    Templates = require("./templates.enum"),
    fs = require("fs");

module.exports = {
    sendMailWithTemplate: function (sender, recipients, subject, template, model, attachment) {
        var templatePath = fs.readFileSync(path.join(__dirname, template), 'utf8'),
            messageHtml = ejs.render(templatePath, {user: model}),
            emitter = new EventEmitter();

        sendMail(sender, recipients, subject, messageHtml, attachment)
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

function sendSingleMail(sender, recipients, subject, body, attachment, callback) {

    var data = {
        from: sender,
        to: sender,
        bcc: recipients,
        subject: subject,
        html: body
    };

    if (attachment) {
        data["attachments"] = [{
            filename: "FE-CONF-Ticket.pdf",
            path:  attachment,
            contentType: "application/pdf"
        }];
    }

    var transporter = nodemailer.createTransport({
        service: "Mailgun",
        auth: {
            user: config.mailgun.smtpLogin,
            pass: process.env.MAILGUN_PASSWORD || "abcde12345"
        }
    });

    transporter.sendMail(data, function (err, body) {

        if (err) {
            return callback(err);
        }
        return callback(null, body);

    });
}