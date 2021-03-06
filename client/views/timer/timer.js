Template.timer.helpers({
    timerState: function() {
        return Session.get('state');
    },
    linkedTask: function() {
        var linked_id = Session.get('linked_id');
        if (linked_id !== undefined) {
            return Tasks.findOne({_id: linked_id}).description;
        }
    },
    linkedAny: function() {
        if (Session.get('linked_id') === undefined) {
            return false;
        }
        return true;
    }
});

Template.timer.events({
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
    'click #btn-stop': function(e) {
        if (pomodoro !== undefined) {
            pomodoro.stop();
        }
    },
    'click #btn-reload': function(e) {
        pomodoro = undefined;
        initPomodoro();
    },
    'click #btn-skip': function(e) {
        if (pomodoro !== undefined) {
            pomodoro.skip();
        }
    }
});

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
