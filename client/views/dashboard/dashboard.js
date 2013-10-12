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

Template.timerModal.helpers({
    timerState: function() {
        return Session.get('state');
    },
    linkedTask: function() {
        var linked_id = Session.get('linked_id');
        if (linked_id !== undefined) {
            return Tasks.findOne({_id: linked_id}).description;
        }
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
                callback: function() {
                    Session.set('timer', this.getPrettyTime());
                    Session.set('percent', this.getPercent());
                    Session.set('state', this.getPrettyState());
                }
            });
        }
    },
    'click #btn-stop': function(e) {
        if (pomodoro !== undefined) {
            pomodoro.stop();
        }
    }
});
