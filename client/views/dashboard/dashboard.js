var pomodoro = undefined;

Template.timerContent.helpers({
    timerValue: function() {
        return Session.get('timer');
    },
    timerPercent: function() {
        return Session.get('percent');
    },
    ticking: function() {
        return Session.get('ticking');
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
        Session.set('ticking', false);
    },
    'click #btn-start': function(e) {
        pomodoro.start();
        Session.set('ticking', true);
    },
    'click #btn-pomodoro': function(e) {
        if (pomodoro === undefined) {
            pomodoro = new Pomodoro({
                callback: function(timerInfo) {
                    Session.set('timer', timerInfo.prettyTime);
                    Session.set('percent', timerInfo.prettyPercent);
                }
            });
        }
    }
});
