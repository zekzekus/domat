pomodoro = undefined;

Template.dashboard.events({
    'click #btn-pomodoro': function(e) {
        var settings = Settings.findOne({user_id: Meteor.user()._id});

        if (!settings) {
            settings = {
                workDuration: undefined,
                shortBreakDuration: undefined,
                longBreakDuration: undefined
            };
        }

        if (pomodoro === undefined) {
            pomodoro = new Pomodoro({
                workDuration: settings.workDuration, 
                shortBreakDuration: settings.shortBreakDuration,
                longBreakDuration: settings.longBreakDuration,
                onCountdown: function() {
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
    }
});
