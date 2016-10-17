var cors = require('cors');
var express = require('express');
var http = require('http');
var io = require('socket.io')(http);
var path = require('path');

var app = express();

app.use(cors());
app.set('port', process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, 'public')));



 




require('./sockets')(io, app);












// Server start to listen for incoming requests
var server = http.createServer(app)
	.listen(app.get('port'), function() {
		console.log('App running at port: ' + app.get('port'));
	});


// Allow sokcet to listen to the server
io.listen(server);