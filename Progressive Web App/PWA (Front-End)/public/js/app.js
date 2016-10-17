var app = angular.module('app', []);
var fw7 = {};
var mainView = {};
var $$ = Dom7;

/*
	Start instantiating socket.io
	for the application to receive
	updates from the server
*/
var socket = io('wss://spar-pwa.azurewebsites.net');
// var socket = io('http://localhost:3000');









/*
	Start running Angular together with Framework7
*/
app.run(function() {
	fw7 = new Framework7({
		pushState: true,
		angular: true
	});
	mainView = fw7.addView('.view-main', {});
});


/*
	Configuration for Angular
*/
app.config(function() {
	window.location.hash = '#!/home.html';
});


/*
	RootController & HomeController is the starting
	page for this whole application
*/
app.controller('RootController', function($scope) {
	$scope.pageTitle = 'Welcome';
});


app.controller('HomeController', function($scope, UserService) {
	$scope.pageTitle = 'Welcome to SPAR Chat';
	$scope.username = '';

	// Getting all the users from UserService
	UserService.getUsers().then(function(data) {
		$scope.users = data;
	});

	$scope.login = function() {
		socket.emit('SetUsername', $scope.username);
		UserService.username = $scope.username;
		mainView.loadPage('chat.html');
	}
});


/*
	ChatController is the controller which handles all
	the chat interfaces
*/
app.controller('ChatController', function($scope, UserService) {
	$scope.pageTitle = "SPAR Chat";


	// Framework7 Chat message UI
	var messages = fw7.messages('.messages', {
		autoLayout: true
	});

	var messageBar = fw7.messagebar('.messagebar');

	$$('.messagebar .link').on('click', function() {
		var messageText = messageBar.value().trim();

		// Exit if empty message
		if (messageText.length === 0) return;

		messageBar.clear();

		// Sending message to socket
		socket.emit('SendMessage', { text: messageText, name: UserService.username });

		messages.addMessage({
			text: messageText,
			type: 'sent'
		})
	});


	// Socket, any messages coming in update UI
	socket.on('message', function(data) {
		messages.addMessage({
			text: data.text,
			type: 'received',
			name: data.name
		})
	});
});






















/*
	User service retrieves the current users
	in the chat
*/
app.service('UserService', function($http) {
	this.username = '';

	this.getUsers = function() {
		var promise = $http({
			method: 'GET',
			url: 'https://spar-pwa.azurewebsites.net/GetChatUsers'
		})
		.then(function(response) {
			 return response.data.users;
		});

		return promise;
	}
});


