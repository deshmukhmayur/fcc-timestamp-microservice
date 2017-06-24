var express = require('express');
var env = require('node-env-file');

var app = express();

env(__dirname + '/.env');

// routes
app.get('/', function(req, res) {
    res.type('txt').send(process.env.SECRET);
});


var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});