var exports 	= module.exports = {};

var express 	= require('express');
var _http 		= require('http');
var open 		= require('open');
var app 		= express();
var httpServer	= _http.Server(app);
var colog 		= require('colog');

var EditXlsx = require('edit-xlsx');
var xlsx 	 = new EditXlsx(__dirname + '/xlsx/template.xlsx');
var sheet	 = xlsx.sheet(0);
var moment   = require('moment');

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

// Export to Excel .xlsx
app.get('/export/:a/:b/:c/:d', function(req, res) {
	sheet.update('A2', moment().format('D/M/YYYY HH:mm'));
	sheet.update('B6', +req.params.a);
	sheet.update('B7', +req.params.b);
	sheet.update('B8', +req.params.c);
	sheet.update('B9', +req.params.d);
	
	var fileName = Math.round(Date.now() / 1000) + '.xlsx';
	var dirFileName = __dirname + '/xlsx/' + fileName;
	xlsx.save(dirFileName);
		
	res.sendFile(dirFileName, {
		headers: {
			'Content-Disposition': 'attachment; filename=' + fileName,
			'Set-Cookie': 'fileDownload=true; path=/'
		}
	});
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
