var express = require('express');
var autheticationHandler = require('../security/autheticationHandler');
var serviceLocator = require('../services/serviceLocator');
var utils = require('../utils/utilFactory');
var userService = serviceLocator.getService(utils.getConstants().SERVICE_USER);
var clientService = serviceLocator.getService(utils.getConstants().SERVICE_CLIENT);
var emailSender = require('../services/emailSender');


var router = express.Router();

router.post('/login', function (req, res) {
    autheticationHandler.login(req).then(function (token) {
        res.json(token);
    }, function (err) {
        throw err;
    })
});

router.post('/sessionValidate', function (req, res, next) {
    autheticationHandler.validateToken(req);
    res.status(200).send('success');
    next();
});

router.post('/logout', function (req, res) {
    autheticationHandler.logout(req);
    res.status(200).send('success');
}, function (err) {
    throw err;
});

router.post('/signup', function (req, res) {

    var context = { data: req.body, user: req.session, reqId: req.id };
    clientService.createClient(context).then(function (client) {
        res.status(200).send('success')
    }, function (err) {
        err = new Error('Singup failed');
    })

});

router.post('/email', function (req, res) {

    emailSender.sendMail();
        res.status(200).send('success')
    }, function (err) {
        err = new Error('Singup failed');
    });


module.exports = router;