'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var errorhandler = require('errorhandler');
var http = require('http');
var path = require('path');
var routes = require('./routes/activity')

var app = express();
app.use(express.json());

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.raw({
  type: 'application/jwt'
}));

app.use(express.static(path.join(__dirname, 'public')));

if ('development' == app.get('env')) {
  app.use(errorhandler());
}

app.use('/', routes)
// app.post('/journeybuilder/save/', activity.save);
// app.post('/journeybuilder/validate/', activity.validate);
// app.post('/journeybuilder/publish/', activity.publish);
// app.post('/journeybuilder/execute/', activity.execute);



http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});