var secondsToTime = function(sec) {
    var remainingMinutes = Math.floor(sec / 60);
    var remainingSeconds = sec - remainingMinutes * 60;
    var digit = "";
    if (remainingSeconds < 10) {
        digit = "0";
    }
    return remainingMinutes.toString() + ':' + digit + String(remainingSeconds);
};

Template.dashboard.helpers({
    timerValue: function() {
        return Session.get('timer');
    }
});

var seconds = 1 * 60;
Meteor.startup(function() {
    Session.set('seconds', seconds);
    Session.set('timer', secondsToTime(seconds));
});


Template.dashboard.events({
    'click #btn-reset': function(e) {
        Session.set('seconds', seconds);
        Session.set('timer', secondsToTime(seconds));
        Meteor.clearInterval(Session.get('timerHandle'));
    },
    'click #btn-start': function(e) {
        var timerHandle = Meteor.setInterval(function() {
            currentVal = Session.get('seconds');
            if (currentVal >= 0) {
                Session.set('seconds', currentVal - 1);
                Session.set('timer', secondsToTime(currentVal));
            } else {
                Meteor.clearInterval(Session.get('timerHandle'));
                return;
            }
        }, 100);
        Session.set('timerHandle', timerHandle);
    }
});
