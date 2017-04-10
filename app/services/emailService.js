var nodemailer = require('nodemailer');
var transport = require('nodemailer-smtp-transport');
const xoauth2 = require('xoauth2');
var utils = require('../utils/utilFactory');
var should = require('should');
var jst = require('jst');


var emailService = utils.getConfiguration().getProperty('emailService');
var user = utils.getConfiguration().getProperty('user');
var password = utils.getConfiguration().getProperty('password');
var mailFrom = utils.getConfiguration().getProperty('mailFrom');


var smtpTransport = nodemailer.createTransport("SMTP", {
    service: emailService,
    auth: {
        user: user,
        pass: password
    }
});


module.exports = (function () {
    return {
        sendMail: sendMail,
        sendVerificationMail: sendVerificationMail
    }

    function sendMail(mailingData) {

        var mailOptions = {
            envelope: {
                from: mailFrom, // used as MAIL FROM: address for SMTP
                to: mailingData.sentTo
            },
            subject: mailingData.emailSubject,
            html: mailingData.htmlBody,
        }
        smtpTransport.sendMail(mailOptions, function (err, result) {
            if (err) {
                result.err = 'mail not sent, some error occured!';
                result.isMailSent = false;
            } else {
                result.isMailSent = true;
            }
            return result;
        });
    }

    function sendVerificationMail(client) {
        var subject = utils.getTemplate().getProperty('signUpMailTemplate')['subject'];
        var bodyTemplate = utils.getTemplate().getProperty('signUpMailTemplate')['body']
       var emailContent = jst.render(bodyTemplate,client.toObject());

     var mailContent={
         sentTo: client.primaryContact,
         htmlBody: emailContent,
         emailSubject: subject
     }   
        sendMail(mailContent);
    }

function resendVerificationMail(client) {
        var subject = utils.getTemplate().getProperty('signUpMailTemplate')['subject'];
        var bodyTemplate = utils.getTemplate().getProperty('signUpMailTemplate')['body']
       var emailContent = jst.render(bodyTemplate,client.toObject());

     var mailContent={
         sentTo: client.primaryContact,
         htmlBody: emailContent,
         emailSubject: subject
     }   
        sendMail(mailContent);
    }


}());


