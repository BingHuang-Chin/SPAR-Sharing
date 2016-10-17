var users = {};

var sockets = function(io, app) {

	/*
		Express routing
	*/
	app.get('/GetChatUsers', function(request, response) {
		var usernames = [];

		for (var key in users)
			usernames.push(key);

		response.json({ users: usernames });
	});


	/*
		Socket connections
	*/
	// io.set('origins', '*:*');

	io.on('connection', function(socket) {

		// Setting username for the user
		socket.on('SetUsername', function(username) {
			socket.nameOfUser = username;
			users[username] = socket;
		});

		// Sending all clients the message
		socket.on('SendMessage', function(data) {
			socket.broadcast.emit('message', data);
		});

		// Remove disconnected user
		socket.on('disconnect', function() {
			delete users[socket.nameOfUser];
		});

	});

}

module.exports = sockets;