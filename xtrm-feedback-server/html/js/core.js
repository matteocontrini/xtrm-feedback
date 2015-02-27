function XtrmViewModel() {
	var self = this;
	
	self.totalCount = ko.observable(0);
	self.correctAnswerId = ko.observable(0);
	
	self.correctAnswerClass = function(id) {
		return ko.computed({
			read: function() {
				return id == this() ? 'green' : 'red';
			}
		}, self.correctAnswerId);
	}
	
	// Online/offline status
	self.connectionStatus = ko.observable(0);
	
	self.answersSummary = ko.observableArray([]);
	for (var i = 0; i < 4; i++) {
		self.answersSummary().push(ko.observable(0));
	}
	
	// Answers percentage
	self.percentage = function (id) {
		return ko.pureComputed(function() {
			var count = self.answersSummary()[id]();
			return count == 0 ? '0 %' : Math.round(count / self.totalCount() * 100) + ' %';
		});
	}
	
	// TODO total students
	
	startSocket();
}

$(document).ready(function() {
	vm = new XtrmViewModel();
	ko.applyBindings(vm);

	console.log('Created vm');
});

function scrollToTop() {
	$('html,body').animate({
		scrollTop: 0
	}, 'fast');
}

function startSocket() {
	var socket = io();
	socket.on('connect', function() {
		console.log('Socket: connected');
		vm.connectionStatus(1);
	});
	socket.on('disconnect', function() {
		console.log('Socket: disconnected');
		vm.connectionStatus(0);
	});
	socket.on('button:pressed', function(msg){
		var messageString = msg.toString().trim();
		if (messageString == '') {
			return;
		}
		console.log('Received: ' + messageString);

		// Parse the message
		var messagePieces = messageString.split(';');
		var username = messagePieces[0];
		var answer = parseInt(messagePieces[1]);

		// Increment the answer people count
		var countProp = vm.answersSummary()[answer];
		countProp(countProp() + 1);
		
		// Increment total count
		vm.totalCount(vm.totalCount() + 1);
	});
}
