var express = require('express');
var userService = require('../services/userService');
var router = express.Router();

router.post('/users', function (req, res) {
    var context = {data : req.body, user:req.session, reqId:req.id};
    userService.getUsers(context).then(function (user) {
        res.json(user);
    }, function (err) {
        throw err;
    })
});

router.get('/user/:id', function (req, res) {
    var context = {userId : req.params.id, user:req.session.user, reqId:req.id};
    userService.getUserById(context).then(function (user) {
        res.json(user);
    }, function (err) {
        throw err;
    })
});

router.post('/user', function (req, res) {
    var context = {data:req.body,user:req.session,reqId:req.id};
    userService.createUser(context).then(function (user) {
        res.json(user)
    }, function (err) {
        throw err;
    })
});

router.put('/user', function (req, res) {
    var context = {data:req.body,user:req.session,reqId:req.id};
    userService.updateUser(context).then(function (user) {
        res.json(user)
    }, function (err) {
        throw err;
    })
});


module.exports = router;