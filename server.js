// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

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

app.get("/api/timestamp/:date_string?", function (req, res, next) {
	let output = {"unix": null, "utc": ""};
	let date;
	let date_string = req.params.date_string;
	try {
		if(!date_string || date_string === "") {
			date = new Date();
		} else {
			if(isNaN(date_string)){
				date = new Date(date_string);
			}
			else {
				date = new Date(date_string*1000);
			}
		}
		output.unix = date.getTime();
		output.utc = date.toUTCString();
		res.json(output);
		return next();

	} catch(err) {
		output.utc = "Invalid Date";
		res.json(output);
		return next(err);
	}
});


// listen for requests :)
var listener = app.listen(process.env.PORT || 3030, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});