var express = require('express');
var utils = require('./app/utils/utilProvider.js');
var bodyParser = require('body-parser');
var dbProvider=require('./app/providers/dbProvider.js');
var routeHandler = require('./app/routes/routerHandler');

//initialise the application
var app = express();

//connect database
dbProvider.connect();

//add body parser for all requests
app.use(bodyParser.json());

//set request headers for all requests
app.all('/*', function(req, res, next) {
// CORS headers
res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
// Set custom headers for CORS
res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
if (req.method == 'OPTIONS') {
res.status(200).end();
} else {
next();
}
});

//handle all the requests
app.use('/api',routeHandler)

// Start the server
app.set('port', utils.getConfiguration().getProperty('app.port') || 3000);
var server = app.listen(app.get('port'), function() {
console.log('Express server listening on port ' + server.address().port);
});