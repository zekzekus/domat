var pomodoro = undefined;

Template.timer.rendered = function() {
    if (pomodoro === undefined) {
        pomodoro = new Pomodoro({
            workDuration: 30,
            shortBreakDuration: 10,
            longBreakDuration: 15,
            callback: function() {
                Session.set('timer', this.getPrettyTime());
                Session.set('percent', this.getPercent());
                Session.set('state', this.getPrettyState());
            },
            onWorkFinish: function() {
                var linked_id = Session.get('linked_id');
                if (linked_id !== undefined) {
                    var linked_task = Tasks.findOne({_id: linked_id});
                    Tasks.update(linked_id, {$set: {
                        completed_pomodoros: linked_task.completed_pomodoros + 1
                    }});
                }
            }
        });
    }
    $('#myModal').modal({keyboard: false});
};

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
    'click button[data-dismiss=modal]': function(e) {
        Router.dispatch('/');
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
