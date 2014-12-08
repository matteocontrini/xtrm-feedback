console.log('**** RUNNING ****\n');

// Setup
var net = require('net'); // socket
var express = require('express');
var expressApp = express(); // express app
var httpServer = require('http').Server(expressApp); // mount app on http server
var io = require('socket.io')(httpServer); // socket.io socket
var open = require('open');

// Ports setup
var httpServerPort = 3000;
var socketPort = 3001;

// TCP server
// Listens for data coming from clients (Spark, Arduino, shell)
var tcpServer = net.createServer();

tcpServer.on('connection', function onConnection(socket) {
	console.log('SERVER --> New connection ' + socket.remoteAddress);
	
	// New message received
	socket.on('data', function onData(message) {
		console.log();
		
		// Split the payload es. deviceId;buttonId
		var messageString = message.toString().trim();
		
		if (messageString == "") {
			return;
		};
		var data = messageString.split(';');
		console.log('SERVER --> Got ' +
			data[1] + ' from ' + data[0]);
		
		buttonId = parseInt(data[1]);
		// Check button ID validity
		if (buttonId >= 0 && buttonId <= 3) {
			// Forward message to the browser client
			console.log('WEB    --> Got valid data, forwarding');
			io.emit('buttonPressed', messageString);
		}
		else {
			console.log('SERVER --> Got invalid data');
		}
	});
	
	// Disconnection
	socket.on('end', function onEnd() {
		console.log('\nSERVER --> Client disconnected');
	});
});

tcpServer.on('listening', function onListening() {
	console.log('SERVER --> Listening on port ' + socketPort);
});

// Start listening
tcpServer.listen(socketPort);


// Web app
// Listen for main page GET requests
expressApp.get('/', function(req, res){
	res.sendFile(__dirname + '/html/index.html');
	console.log('WEB    --> Request');
});
expressApp.use(express.static('html'));

// Web server
// Start listening
httpServer.on('listening', function onListening() {
	console.log('WEB    --> Listening on port ' + httpServerPort);
	console.log("\nLaunching the browser...\n");
	open("http://localhost:" + httpServerPort);
});
httpServer.listen(httpServerPort);

// Web socket
// Listen for connection
io.on('connection', function onConnection(socket) {
	console.log('WEB    --> Client connected');

	socket.on('disconnect', function onDisconnection() {
		console.log('WEB    --> Client disconnected');
	});
});