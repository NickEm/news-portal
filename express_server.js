// set up ======================================================================
var express = require('express');
var app = express(); 								// create our app w/ express
var port = process.env.PORT || 3003; 				// set the port
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongojs = require('mongojs');
var newsDb = mongojs('news', ['news']);
var commentsDb = mongojs('comments', ['comments']);

// configuration ===============================================================

app.use(express.static(__dirname + '/public')); 		// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/node_modules'));
app.use(bodyParser.urlencoded({'extended':'true'})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request

app.get('/news/:news_id/comments', function (req, res) {
    var newsId = req.params.news_id;
    console.log('Request to comments for news with id: ' + newsId);
    commentsDb.comments.find({'news_id': newsId}, function(err, doc) {
        res.json(doc);
    });
});

app.get('/news/:news_type/:id', function (req, res) {
    var id = req.params.id;
    console.log('Request for the news: ' + req.params.id);
    newsDb.news.find({_id: mongojs.ObjectId(id)}, function(err, doc) {
        res.json(doc);
    });
});

app.get('/news/:news_type', function (req, res) {
    var newsType = req.params.news_type;
    console.log('Request for the news of type: ' + req.params.news_type);
    newsDb.news.find({'type': newsType}, function(err, doc) {
        res.json(doc);
    });
});

app.put('/news/:id', function (req, res) {
    var id = req.params.id;
    console.log('Request to update the news with id: ' + req.params.id);
    newsDb.news.findAndModify({query: {_id: mongojs.ObjectId(id)},
        update: {$set: {title: req.body.title, description: req.body.description, "author.name": res.body.author.name,
            "author.description": res.body.author.description}},
        new: true}, function(err, doc) {
        res.json(doc);
    });
});

app.delete('/news/:id', function (req, res) {
    var id = req.params.id;
    console.log('Request to delete news with id: ' + id);
    newsDb.news.remove({_id: mongojs.ObjectId(id)}, function(err, doc) {
        res.json(doc);
    });
});

// routes ======================================================================
app.get('*', function(req, res) {
    // load the single view file (angular will handle the page changes on the front-end)
    res.sendFile(__dirname + '/public/index.html');
});

// listen (start app with node server.js) ======================================
app.listen(port);
console.log("Application started on port: " + port);
