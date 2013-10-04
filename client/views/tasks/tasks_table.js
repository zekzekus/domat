Template.tasksTable.helpers({
    tasks: function() {
        return Tasks.find({}, {sort: {timestamp: -1}});
    }
});

Template.tasksTable.events({
    'keyup #inp-new-task': function(e) {
        if (e.which === 13) {
            var taskDescription = e.target.value;
            if (!Meteor.user()) {
                throwError('Please login to create task!');
            } else {
                Tasks.insert({
                    description: taskDescription,
                    assignee: Meteor.user().profile.name,
                    completed_pomodoros: 0,
                    completed: false,
                    timestamp: (new Date()).getTime()
                });
                e.target.value = "";
            }
        }
    }
});

Template.taskItem.events({
    'click #btn-complete': function(e) {
        Tasks.update(this._id, {$set: {completed: !this.completed}});
    },
    'click #btn-delete': function(e) {
        Tasks.remove(this._id);
    }
});
