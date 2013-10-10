var pomodoro = undefined;

Template.timerContent.helpers({
    timerValue: function() {
        return Session.get('timer');
    }
});

Template.dashboard.helpers({
    timerValue: function() {
        return Session.get('timer');
    }
});

Template.dashboard.events({
    'click #btn-reset': function(e) {
        if (pomodoro !== undefined) {
            pomodoro.reset();
        }
    },
    'click .btn-start': function(e) {
        pomodoro.start();
    },
    'click #btn-pomodoro': function(e) {
        if (pomodoro === undefined) {
            pomodoro = new Pomodoro({
                callback: function(prettyTime) {
                    Session.set('timer', prettyTime);
                }
            });
        }
    }
});
