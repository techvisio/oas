var express = require('express');
//TODO:move authhandler to service locator
var autheticationHandler = require('../security/autheticationHandler');
var serviceLocator = require('../services/serviceLocator');
var utils = require('../utils/utilFactory');
var userService = serviceLocator.getService(utils.getConstants().SERVICE_USER);
var clientService = serviceLocator.getService(utils.getConstants().SERVICE_CLIENT);
var emailService = serviceLocator.getService(utils.getConstants().SERVICE_EMAIL);


var router = express.Router();

router.post('/login', function (req, res) {
    autheticationHandler.login(req).then(function (token) {
        res.json(token);
    }, function (err) {
        throw err;
    })
});

router.post('/sessionValidate', function (req, res, next) {
    var result = autheticationHandler.validateToken(req);
    if (!result.isValid) {
        throw new Error(result.err);
    }
    res.status(200).send('success');
});

router.post('/logout', function (req, res) {
    //TODO
    //handle logout as validate service should return a result object
    autheticationHandler.logout(req);
    res.status(200).send('success');
});

router.post('/signup', function (req, res) {

//TODO:
//No need to have context on public calls

    var context = { data: req.body, user: req.session, reqId: req.id };
    clientService.createClient(context).then(function (client) {
        res.status(200).send('success')
    }, function (err) {
        err = new Error('Singup failed');
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