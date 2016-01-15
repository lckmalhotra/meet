'use strict';

import config from '../../config/environment';

var path = require('path'),
    ejs = require('ejs'),
    _ = require('lodash'),
    fs = require('fs'),
    EventEmitter = require('events').EventEmitter,
    pdfTemplateEnum = require("./templates.enum"),
    phantom = require('./phantom');

var option = {
    paperSize: {format: 'A4', orientation: 'portrait', border: '1.8cm'}
};
var basePath = path.join(process.cwd(), './tickets/');

module.exports = {
    generatePdf: function(user, templateName) {
        var emitter = new EventEmitter(),
            template = fs.readFileSync(path.join(__dirname, templateName), 'utf8'),
            html = "";

        try {
            html = ejs.render(template, {});
        } catch (error) {
            return emitter.emit("ERROR", new Error("HTML Creation error"));
        }

        if (html) {
            phantom.createPhantomSession(function (error, ph) {
                var recipePdfPath = "";
                if (error) {
                    return emitter.emit("ERROR", error);
                } else {
                    recipePdfPath = basePath + "FE-Conf-" + user._id + "-ticket.pdf";
                    phantom.generatePdfFromHtml(html, recipePdfPath, option, function (error, filePath) {
                        if (error) {
                            return emitter.emit("ERROR", error);
                        }
                        return emitter.emit("SUCCESS", {
                            path: filePath,
                            name: path.basename(filePath)
                        });
                    })
                }
            });
        } else {
            return emitter.emit("ERROR", new Error("HTML Creation error"));
        }
        return emitter;
    }
};