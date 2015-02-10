var instance = {};
$(document).ready(function() {
    instance.totalCount = 0;
    instance.correctAnswer = 0;

    startSocket();

    $('#settings_open').click(function() {
        $('#options').slideDown('fast');
    });

    $('#settings_close').click(function() {
        $('#options').slideUp('fast');
        scrollToTop();
    });

    $('settings_reset').click(function() {
        scrollToTop();
    });

    $('.number').click(function() {
        var n = $(this).parent().attr('id').slice(-1);
        instance.correctAnswer = parseInt(n);
        showCorrectAnswer();
    });

    showCorrectAnswer();
});

function scrollToTop() {
    $('html,body').animate({
        scrollTop: 0
    }, 'fast');
}

function startSocket() {
    var socket = io();
    socket.on('connect', function() {
        console.log('Connected');
        connectionStatus.connected();
    });
    socket.on('disconnect', function() {
        console.log('Disconnected');
        connectionStatus.disconnected(); 
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
        var currentCount = $('#answer' + answer + '_count').text();
        currentCount = parseInt(currentCount);
        currentCount++;
        $('#answer' + answer + '_count').text(currentCount);

        // Increment the total count
        instance.totalCount++;
        showTotalCount();

        // Recalc percentages
        for (var i = 0; i < 4; i++) {
            var peopleCount = $('#answer' + i + '_count').text();
            peopleCount = parseInt(peopleCount);

            var percentage = peopleCount / totalCount * 100;
            percentage = Math.round(percentage);
            $('#answer' + i + '_percentage').text(percentage + ' %');
        }

    });
}

var connectionStatus = {
    onlineText: 'ONLINE',
    offlineText: 'OFFLINE',
    connected: function() {
        $("#status-indicator").removeClass('bg-red').addClass('bg-green');
        $("#status-desc").text(this.onlineText);
    },
    disconnected: function() {
        $("#status-indicator").removeClass('bg-green').addClass('bg-red');
        $("#status-desc").text(this.offlineText);
    }
};

function showCorrectAnswer() {
    for (var i = 0; i < 4; i++) {
        $el = $('#answer' + i);
        if (i == instance.correctAnswer) {
            $el.find('.number').removeClass('red').addClass('green');
        }
        else {
            $el.find('.number').removeClass('green').addClass('red');
        }
    }
}

function showTotalCount() {
    $('span#total_count').text(instance.totalCount);
}
