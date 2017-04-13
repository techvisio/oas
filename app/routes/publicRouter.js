var express = require('express');
var serviceLocator = require('../services/serviceLocator');
var utils = require('../utils/utilFactory');
var userService = serviceLocator.getService(utils.getConstants().SERVICE_USER);
var clientService = serviceLocator.getService(utils.getConstants().SERVICE_CLIENT);
var emailService = serviceLocator.getService(utils.getConstants().SERVICE_EMAIL);
var authenticationHandler = serviceLocator.getService(utils.getConstants().SERVICE_AUTHENTICATION);

var router = express.Router();

router.post('/login', function (req, res) {
    authenticationHandler.login(req).then(function (token) {
        res.json(token);
    }, function (err) {
        throw err;
    })
});

router.post('/sessionValidate', function (req, res, next) {
    var result = authenticationHandler.validateToken(req);
    if (!result.isValid) {
        throw new Error(result.err);
    }
    res.status(200).send('success');
});

router.post('/logout', function (req, res) {

    var result=authenticationHandler.logout(req);
    if (!result.isLoggedOut) {
        throw new Error(result.err);
    }
    res.status(200).send('success');
});

router.post('/signup', function (req, res,next) {

    var data = req.body;
    clientService.signupClient(data).then(function (client) {
        res.status(200).send('success')
    }, function (err) {
        next(err);
    })

});

router.get('/client/verify', function (req, res) {
    var verificationCode = req.query.hashCode;
    clientService.verifyUser(verificationCode).then(function (client) {
        res.json(client);
    }, function (err) {
        throw err;
    })

});

router.post('/resendverificationmail', function (req, res) {

    var emailId = req.body.emailId;
    clientService.resendVerificationMail(emailId).then(function (msg) {
        res.status(200).send(msg)
    }, function (err) {
        throw err;
    })

});

module.exports = router;