console.log('**** RUNNING ****');

// Setup
var net = require('net'); // socket
var express = require('express');
var expressApp = express(); // express app
var httpServer = require('http').Server(expressApp); // mount app on http server
var io = require('socket.io')(httpServer); // socket.io socket

// Ports setup
var httpServerPort = 3000;
var sparkSocketPort = 3001;

// TCP server
// Listens for data coming from Sparks
var tcpServer = net.createServer(function (socket) {
	socket.addListener('data', function (message) {
		// Split the payload
		data = message.toString().trim().split(';'); // es. sparkId;buttonId
		console.log('TCP SERVER --> Got ' + data[1] + ' from ' + data[0]);
		
		buttonId = parseInt(data[1]);
		// Check button ID validity
		if (buttonId >= 0 && buttonId <= 3) {
			// Forward message to the browser client
			io.emit('buttonPressed', message);
		};
	});
});
// Start listening
tcpServer.listen(sparkSocketPort, function () {
	console.log('TCP SERVER --> Listening on port ' + sparkSocketPort);
});


// Web app
// Listen for main page GET requests
expressApp.get('/', function(req, res){
	res.sendFile(__dirname + '/html/index.html');
	console.log('WEB SERVER --> Main page request');
});
expressApp.use(express.static('html'));

// Web server
// Start listening
httpServer.listen(httpServerPort, function(){
	console.log('WEB SERVER --> Listening on port ' + httpServerPort);
});

// Web socket
// Listen for connection
io.on('connection', function(socket){
	console.log('WEB BROWSER SOCKET --> Client connected');
});
console.log('WEB BROWSER SOCKET --> Listening');