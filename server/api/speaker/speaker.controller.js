/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/Registrations              ->  index
 * POST    /api/Registrations              ->  create
 * GET     /api/Registrations/:id          ->  show
 * PUT     /api/Registrations/:id          ->  update
 * DELETE  /api/Registrations/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Speakers from './speaker.model.js';
import Templates from "../mail/templates.enum.js";
import PDFTemplates from "../pdf/templates.enum.js";
import * as MailService from "../mail/mail.service.js";
import * as PdfService from "../pdf/pdf.service.js";

var path = require("path");

export function generateAndSendTicket(req, res, next) {
    var userId = req.body._id;

    Speakers.findOne({_id: userId}, {name: 1, email: 1}).lean().exec(function (err, user) {
        console.log(err, user);
        if (err) {
            console.log("Error fetching user", err);
            return handleError(res);
        } else {
            generatePdf(user, function (err, resp) {
                if (err) {
                    return handleError(res);
                }
                sendMailWithPDF(user, function (err, resp) {
                    if (err) {
                        console.log("Error sending mail", err);
                    } else {
                        console.log("Mail sent", resp);
                        Speakers.update({
                            _id: user._id
                        }, {
                            $set: {ticketSent: true}
                        }, function(err, c) {
                            console.log("Updated ticketSent value for", user.name);
                            console.log(err, c);
                        });
                    }
                });
            });
            res.json({message: "Processing request"});
        }
    });
}

function sendMailWithPDF(user, cb) {
    var basePath = path.join(process.cwd(), './tickets/'),
        ticketToAttach = basePath + "FE-Conf-" + user._id + "-ticket.pdf";

    MailService.sendMailWithTemplate(
        null,
        user.email,
        "[FE-CONF] Entry Ticket!",
        Templates.TICKET,
        user,
        ticketToAttach
    )
        .once("ERROR", function (err) {
            cb(err);
        })
        .once("SUCCESS", function (resp) {
            cb(null, resp);
        });
}

function generatePdf(user, cb) {
    PdfService.generatePdf(user, PDFTemplates.TICKET)
        .once("ERROR", function (err) {
            console.log("error generating PDF", err);
            cb(err);
        })
        .once("SUCCESS", function (err) {
            cb(null, user);
        });
}

function respondWithResult(res, statusCode) {

    statusCode = statusCode || 200;
    return function (entity) {
        if (entity) {
            if (entity.email) {
                MailService.sendMailWithTemplate(null, entity.email, "[FE-CONF] Speakers Acknowledgement", Templates.CONFIRMATION, entity)
                    .once("ERROR", function (err) {
                        console.log("Error sending mail", err);
                    })
                    .once("SUCCESS", function (resp) {
                        console.log("Mail sent", resp);
                    });
            }
            res.status(statusCode).json(entity);
        }
    };
}

function saveUpdates(updates) {
    return function (entity) {
        var updated = _.merge(entity, updates);
        return updated.saveAsync()
            .spread(updated => {
                return updated;
            });
    };
}

function removeEntity(res) {
    return function (entity) {
        if (entity) {
            return entity.removeAsync()
                .then(() => {
                    res.status(204).end();
                });
        }
    };
}

function handleEntityNotFound(res) {
    return function (entity) {
        if (!entity) {
            res.status(404).end();
            return null;
        }
        return entity;
    };
}

function handleError(res, statusCode) {
    statusCode = statusCode || 500;
    return function (err) {
        console.log(err);
        res.status(statusCode).send(err);
    };
}

// Gets a list of Speakerss
export function index(req, res) {
    Speakers.findAsync()
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Gets a single Speakers from the DB
export function show(req, res) {
    Speakers.findByIdAsync(req.params.id)
        .then(handleEntityNotFound(res))
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Creates a new Speakers in the DB
export function create(req, res) {
    //new Speakers(req.body).save(function(err,result){
    //  console.log(">>>>>>>>>>save>>>>>>>>>>>");
    //  console.log(err,result);
    //  res.send(req.body);
    //});
    Speakers.createAsync(req.body)
        .then(respondWithResult(res, 201))
        .catch(handleError(res));
}

// Updates an existing Speakers in the DB
export function update(req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    Speakers.findByIdAsync(req.params.id)
        .then(handleEntityNotFound(res))
        .then(saveUpdates(req.body))
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Deletes a Speakers from the DB
export function destroy(req, res) {
    Speakers.findByIdAsync(req.params.id)
        .then(handleEntityNotFound(res))
        .then(removeEntity(res))
        .catch(handleError(res));
}


export function referFriends(req, res) {
    var emailList = req.body.emails || [];

    if(emailList.length) {
        console.log("Sending mails to", emailList.length, "people");
        MailService.sendMailWithTemplate(null, emailList, "You're Invited to Frontend/UI Conf.", Templates.REFERRAL, {})
            .once("ERROR", function (err) {
                console.log("Error sending mail", err);
            })
            .once("SUCCESS", function (resp) {
                console.log("Mail(s) sent", resp);
            });

        res.status(200).json({message: "Mails sent"});
    } else {
        res.status(201).json({message: "No emails provided. Did not send any mail"});
    }
}
