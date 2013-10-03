Template.tasksTable.helpers({
    tasks: function() {
        return Tasks.find({}, {sort: {timestamp: -1}});
    }
});

Template.tasksTable.events({
    'keyup #inp-new-task': function(e) {
        if (e.which === 13) {
            var taskDescription = e.target.value;
            Tasks.insert({
                description: taskDescription,
                assignee: Meteor.user().services.google.email,
                completed_pomodoros: 0,
                completed: false,
                timestamp: (new Date()).getTime()
            });
            e.target.value = "";
        }
    }
});

Template.taskItem.events({
    'click #btn-complete': function(e) {
        e.preventDefault();
        Tasks.update(this._id, {$set: {completed: !this.completed}});
        return false;
    },
    'click #btn-delete': function(e) {
        Tasks.remove(this._id);
    }
});
