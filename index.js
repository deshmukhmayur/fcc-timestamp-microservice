var path = require('path');
var express = require('express');
var env = require('node-env-file');

var app = express();

env(__dirname + '/.env');

// to prettify JSON output
// app.set('json spaces', 40);

// to serve static files without routes
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.get('/:date', function(req, res) {
  
  try {
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
  } catch (e) {
    res.json({
      unix: null,
      natural: null
    });
  }
});


var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});