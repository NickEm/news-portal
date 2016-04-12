// set up ======================================================================
var express = require('express');
var app = express(); 								// create our app w/ express
var port = process.env.PORT || 3003; 				// set the port
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongojs = require('mongojs');
var db = mongojs('news', ['news']);

// configuration ===============================================================

app.use(express.static(__dirname + '/public')); 		// set the static files location /public/img will be /img for users
app.use(bodyParser.urlencoded({'extended':'true'})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request

app.get('/news/:news_type', function (req, res) {
    console.log('Request for the news of type: ' + req.params.news_type);
});

// routes ======================================================================
app.get('*', function(req, res) {
    // load the single view file (angular will handle the page changes on the front-end)
    res.sendFile(__dirname + '/public/index.html');
});



// listen (start app with node server.js) ======================================
app.listen(port);
console.log("Application started on port: " + port);
