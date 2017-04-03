var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

var smtpTransport = nodemailer.createTransport(smtpTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secureConnection: false,
    auth: {
        user: 'support@eservicetechvisio.com',
        password: 'P@ssw0rd'
    },
    tls: {
        rejectUnauthorized: false
    }
}));


module.exports = (function sendMail() {
    return {
        sendMail: sendMail
    }


    function sendMail() {
        smtpTransport.sendMail({
            from: 'support@eservicetechvisio.com',
            to: 'sgusain91@gmail.com',
            subject: 'hello world!',
            text: 'Authenticated with OAuth2'

        }, function (error, response) {
            if (error) {
                console.log(error);
            } else {
                response.json('Message sent');
            }
        })
    }
}());
