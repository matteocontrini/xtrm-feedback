var exports = module.exports = {};

var net 	= require('net');
var colog 	= require('colog');

var SOCKET_PORT = 0;
exports.setPort = function(port) {
	SOCKET_PORT = port;
}

var callback;
exports.start = function(_callback) {
	// Start listening
	tcpServer.listen(SOCKET_PORT);
	callback = _callback;
}

var tcpServer = net.createServer();

// Handle new connection
tcpServer.on('connection', function onConnection(socket) {
	colog.success('\nSERVER --> New connection ' + socket.remoteAddress);

	// New message received
	socket.on('data', function onData(message) {
		// Split the payload es. deviceId;buttonId
		var messageString = message.toString().trim();
		
		// TODO check redundant transmissions
		if (messageString == '') {
			return;
		};
		var data = messageString.split(';');
		colog.question('\nSERVER --> Got ' +
			data[1] + ' from ' + data[0]);

		buttonId = parseInt(data[1]);
		// Check button ID validity
		if (buttonId >= 0 && buttonId <= 3) {
			// Forward message to the browser client
			colog.success('WEB    --> Got valid data, forwarding');
			callback(messageString);
		}
		else {
			colog.error('SERVER --> Got invalid data');
		}
	});

	// Disconnection
	socket.on('close', function onClose() {
		colog.warning('\nSERVER --> Client disconnected');
	});
});

// Log listening
tcpServer.on('listening', function onListening() {
	colog.headerSuccess('SERVER --> Listening on port ' + SOCKET_PORT);
});