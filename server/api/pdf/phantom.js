'use strict';

import config from '../../config/environment';

var session,
    _ = require('lodash'),
    phantomjs = require("phantomjs"),
    Phantom = require("node-phantom-simple");

var createPhantomSession = function (cb) {
    cb = cb || function () {
        };
    if (session) {
        return cb(null, session);
    } else {
        Phantom.create({path: phantomjs.path}, function (error, _session) {
            if (error) {
                console.error(error);
                return cb(error, session);
            }
            session = _session;
            return cb(null, session);
        });
    }
};
var generatePdfFromHtml = function (html, path, option, cb) {
    if (!cb) {
        cb = option || function () {
            };
        option = {}
    }
    var page;
    try {
        session.createPage(function (error, _page) {
            page = _page;
            _.forEach(option, function (value, key) {
                page.set(key, value);
            });
            page.set('content', html, function (error) {
                if (error) {
                    console.log('Error setting content: %s', error);
                    return cb(error);
                }
            });

            page.onResourceRequested = function (rd, req) {
                if (rd && rd[0])
                    console.log("REQUESTING:: ", rd[0].url);
            };
            page.onResourceReceived = function (rd) {
                if (rd.stage === "end")
                    console.log("LOADED:: ", rd.url);
            };
            page.onLoadFinished = function (status) {
                page.render(path, function (error) {
                    page.close();
                    page = null;
                    if (error)
                        cb(error);
                    return cb(null, path);
                });
            }
        });
    } catch (e) {
        try {
            if (page !== null) {
                page.close(); // try close the page in case it opened but never rendered a pdf due to other issues
            }
        } catch (e) {
            // ignore as page may not have been initialised
        }
        return cb('Exception rendering pdf:' + e.toString());
    }
};

exports = module.exports = {
    createPhantomSession: createPhantomSession,
    generatePdfFromHtml: generatePdfFromHtml
};

process.on('exit', function (code, signal) {
    session.exit();
});
