var express = require('express');
var propertyHolder = require('./app/utils/propertyHolder.js');
var bodyParser = require('body-parser');
var logger = require('./app/utils/logger');
var dbProvider=require('./app/providers/dbProvider.js');
var app = express();
var adminRouter = require('./app/routes/appAdminRoute.js');
dbProvider.connect();
//app.use(logger('dev'));
app.use(bodyParser.json());
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
app.use('/admin',adminRouter);
// Start the server
app.set('port', app.port || 3000);
var server = app.listen(app.get('port'), function() {
console.log('Express server listening on port ' + server.address().port);
});