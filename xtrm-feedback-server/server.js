var colog 		= require('colog');

colog.question('**** RUNNING ****\n');

var tcpServer 	= require('./tcpServer.js');
var httpServer 	= require('./httpServer.js');

// TCP server
tcpServer.setPort(3001);
tcpServer.start(function onNewMessage(message) {
	io.emit('button:pressed', message);
});

// HTTP server
httpServer.setPort(3000);
httpServer.start();

// IO socket
var io = require('socket.io')(httpServer.server);

io.on('connection', function onConnection(socket) {
	colog.success('WEB    --> Client connected');

	socket.on('disconnect', function onDisconnection() {
		colog.warning('WEB    --> Client disconnected');
	});
});
