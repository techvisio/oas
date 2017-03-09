var express = require('express');

var router = express.Router();

router.get('/client/new', function(req, res) {
    res.send('GET handler for /dogs route.');
});


module.exports = router;