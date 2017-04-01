var express = require('express');
var userService = require('../services/userService.js');
var adminMapping = require('../mappings/adminMapping.js');
var router = express.Router();

router.post('/user', function (err, req, res, next) {
    userService.createUser(req.body);
    res.send('Created successfully');
});


module.exports = router;