// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:data", function (req, res) {
  const data = req.params.data;
  var dateUnix, dateUtc;
  console.log("data ",data);
  if (new Date(data).toString() !== 'Invalid Date') {
    console.log("utc");
    dateUnix = new Date(data).getTime();
    dateUtc = new Date(data).toUTCString();
  }
  else if (new Date(data*1).toString() !== 'Invalid Date') {
    console.log("unix");
    dateUnix = data;
    dateUtc =  new Date(data*1).toUTCString();
  }
  else {
    console.log("Invalid Date");
    res.json({ error : "Invalid Date" });
  }
  res.json({unix: Number(dateUnix), utc:dateUtc});
});

app.get("/api/", function (req, res) {
  const dateUnix = new Date().getTime();
  const dateUtc  = new Date().toUTCString();
  console.log("dateUnix :",dateUnix,"  dateUtc :",dateUtc);
  res.json({unix: dateUnix, utc:dateUtc});
})


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
