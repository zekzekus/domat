var secondsToTime = function(sec) {
    var remainingMinutes = Math.floor(sec / 60);
    var remainingSeconds = sec - remainingMinutes * 60;
    remainingMinutes = remainingMinutes < 10 ? "0" + remainingMinutes : remainingMinutes;
    remainingSeconds = remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds;
    return remainingMinutes + ':' + remainingSeconds;
};

Template.timerContent.helpers({
    timerValue: function() {
        return Session.get('timer');
    }
});

var seconds = 25 * 60;
Meteor.startup(function() {
    Session.set('seconds', seconds);
    Session.set('timer', secondsToTime(seconds));
    Session.set('timerHandle', undefined);
});


Template.dashboard.events({
    'click #btn-reset': function(e) {
        Session.set('seconds', seconds);
        Session.set('timer', secondsToTime(seconds));
        Meteor.clearInterval(Session.get('timerHandle'));
        Session.set('timerHandle', undefined);
    },
    'click #btn-start': function(e) {
        if (Session.get('timerHandle') === undefined) {
            var timerHandle = Meteor.setInterval(function() {
                currentVal = Session.get('seconds');
                if (currentVal >= 0) {
                    Session.set('seconds', currentVal - 1);
                    Session.set('timer', secondsToTime(currentVal));
                } else {
                    Meteor.clearInterval(Session.get('timerHandle'));
                    Session.set('timerHandle', undefined);
                    return;
                }
            }, 1000);
            Session.set('timerHandle', timerHandle);
        }
    }
});
