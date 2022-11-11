// index.js
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
app.get("/api/:date", function (req, res) {
	let date = req.params.date;	
	const newDate = new Date(date);
	// const unixDate = new Date(date);

	if (date.length <= 10) {
	console.log("date: " + date);
	let unix = newDate.getTime();
	console.log("unix: " + unix);
	let utc = newDate.toGMTString();	
	console.log(`"utc: "${utc}`);
  res.json({unix, utc});
	} else {
		console.log(date);
		console.log(typeof date);
		date = parseInt(date);
		console.log(typeof date);
		let convertUnix = date * 1000;
		let unixDates = new Date(convertUnix);
		console.log(new Date(date));
		console.log(unixDates);
		let utc = unixDates.toGMTString();
		console.log(`"utc: "${utc}`);
		res.json({"unix" : parseInt(date), utc });
	};
});

app.get("/api/", function (req, res) {
	let date = new Date();
	let unix = date.getTime();
	// let utc = date.toGMTString();	
	res.json({unix});

});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
