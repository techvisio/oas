var express = require('express');
var userService = require('../services/userService');
var router = express.Router();

router.post('/users', function (req, res) {
    
    var user = req.body;
    var loggedInUser = req.session.user;
    var context = {data : user, user:loggedInUser, reqId:req.id};
    
    userService.getUsers(context).then(function (user) {
        res.json(user);
    }, function (err) {
        throw err;
    })
});

router.get('/user/:id', function (req, res) {
    
    var userId = req.params.id;
    var loggedInUser = req.session.user;
    var context = {userId : userId, user:loggedInUser, reqId:req.id};

    userService.getUserById(context).then(function (user) {
        res.json(user);
    }, function (err) {
        throw err;
    })
});

router.post('/user', function (req, res) {
    
    var user = req.body;
    var loggedInUser = req.session.user;
    var context = {data:user, user:loggedInUser, reqId:req.id};
    
    userService.createUser(context).then(function (user) {
        res.json(user)
    }, function (err) {
        throw err;
    })
});

router.put('/user', function (req, res) {
    
    var user = req.body;
    var loggedInUser = req.session.user;
    var context = {data:user, user:loggedInUser, reqId:req.id};

    userService.updateUser(context).then(function (user) {
        res.json(user)
    }, function (err) {
        throw err;
    })
});


module.exports = router;