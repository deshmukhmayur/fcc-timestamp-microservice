var express = require('express');
var env = require('node-env-file');

var app = express();

env(__dirname + '/.env');

// app.set('json spaces', 40);

// routes
app.get('/', function(req, res) {
  res.json({unix:null, natural:null});
  // res.type('txt').send(process.env.SECRET);
});

app.get('/:date', function(req, res) {
  var date = req.params.date;
  var formatter = Intl.DateTimeFormat("en", { month: "long", day: 'numeric', year: 'numeric' });

  if (!isNaN(date)) {
    date = new Date(Number(date)  * 1000);
  } else {
    date = new Date(date);
  }
  res.json({
    unix: Math.floor(date.getTime()/1000),
    natural: formatter.format(date)
  });
});


var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});