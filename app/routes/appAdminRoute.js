var express = require('express');
var adminMapping = require('../mappings/adminMapping.js');
var router = express.Router();

router.post('/client', function(req, res) {
   adminMapping.saveClient(req.body);
   res.send('Created successfully');
});


module.exports = router;