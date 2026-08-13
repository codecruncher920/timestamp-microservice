var express = require('express');
var app = express();

// Enable CORS so that your API is remotely testable by freeCodeCamp
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));

// Serve static files
app.use(express.static('public'));

// Serve home page
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// Timestamp API Endpoint
app.get('/api/:date?', function (req, res) {
  let dateParam = req.params.date;
  let date;

  // Case 1: Empty date parameter -> use current date
  if (!dateParam) {
    date = new Date();
  } else {
    // Case 2: Date parameter is numeric string (Unix timestamp in ms)
    if (!isNaN(dateParam)) {
      date = new Date(parseInt(dateParam));
    } else {
      // Case 3: Date parameter is a standard date string
      date = new Date(dateParam);
    }
  }

  // Check if date is invalid
  if (date.toUTCString() === 'Invalid Date') {
    return res.json({ error: 'Invalid Date' });
  }

  // Return formatted JSON
  return res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// Listen on port set in environment or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
