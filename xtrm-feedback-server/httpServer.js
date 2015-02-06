var exports 	= module.exports = {};

var express 	= require('express');
var _http 		= require('http');
var open 		= require('open');
var app 		= express();
var httpServer	= _http.Server(app);
var colog 		= require('colog');

var PORT = 0;
exports.setPort = function (port) {
	PORT = port;
};
exports.start = function() {
	httpServer.listen(PORT);
};
exports.stop = function() {
	httpServer.close();
};
exports.server = httpServer;

// Root request
app.get('/', function(req, res){
	res.sendFile(__dirname + '/html/index.html');
	colog.success('WEB    --> Request');

});

// Static files
app.use(express.static(__dirname + '/html'));

// Log listening
httpServer.on('listening', function onListening() {
	colog.headerSuccess('WEB    --> Listening on port ' + PORT);

	var silentMode = process.argv.slice(2).length;
	if (!silentMode) {
		colog.question("\nLaunching the browser...\n");
		open('http://localhost:' + PORT);
	};
});
