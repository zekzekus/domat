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
    'click #btn-start': function(e) {
        if (pomodoro === undefined) {
            pomodoro = new Pomodoro({
                workDuration: 25,
                shortBreakDuration: 5,
                longBreakDuration: 15,
                callback: function(prettyTime) {
                    Session.set('timer', prettyTime);
                }
            });
        }
        pomodoro.start();
    }
});
