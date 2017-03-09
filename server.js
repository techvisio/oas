var express = require('express');
var propertyHolder = require('./app/utils/propertyHolder');
var bodyParser = require('body-parser');
var logger = require('./app/utils/logger');
var app = express();
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

//app.all('/api/v1/*', [require('./middlewares/validateRequest')]);
//app.use('/', require('./routes'));
// If no route is matched by now, it must be a 404
logger.info('testing logging work');
app.use(function(req, res, next) {
res.send('Hello Node '+propertyHolder.getProperty('development:databaseUrl'));
});
// Start the server
app.set('port', app.port || 3000);
var server = app.listen(app.get('port'), function() {
console.log('Express server listening on port ' + server.address().port);
});