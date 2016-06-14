var express = require('express');
var app = express();
var path = require('path');

var port = process.env.PORT || 8080;

app.use(express.static('app'));
app.use(express.static('app/css'));
app.use(express.static('app/js'));
app.use(express.static('app/media'));

app.get('/', function(req, res) {
    res.sendFile(path.join('/app/index.html'));
});

app.use(express.static('app/en'));
app.use(express.static('app/en/css'));
app.use(express.static('app/en/js'));
app.use(express.static('app/en/media'));

app.get('/en', function(req, res) {
    res.sendFile(path.join('/app/en/index.html'));
});

app.listen(port);