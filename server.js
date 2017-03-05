var express = require('express');
var nconf = require('nconf');
//var path = require('path');
//var logger = require('morgan');
var bodyParser = require('body-parser');
nconf.argv()
   .env()
   .file({ file: 'config/config.json' });
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
app.use(function(req, res, next) {
res.send('Hello Node'+nconf.get('development:databaseUrl'));
});
// Start the server
app.set('port', app.port || 3000);
var server = app.listen(app.get('port'), function() {
console.log('Express server listening on port ' + server.address().port);
});