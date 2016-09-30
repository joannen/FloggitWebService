var express = require('express');
var app = express();
var routes = require('./controllers/routes/routes');
var http = require('http').Server(app);
// var io = require('socket-io');
var jsonParser = require('body-parser').json;

app.use(jsonParser());
var logger = require('morgan');

app.use(logger('dev'));
app.use('/postits', routes);

// app.get('/', function(req, res) {
//     res.status(200).send('hallå världen!');
// });
//io.on('connection', function() {
//	return 'not implemented';
//});

http.listen(8080, function() {
    console.log('service started on port 8080, url: http://localhost:8080');
});
