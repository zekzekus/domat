Template.tasksTable.helpers({
    tasks: function() {
        return Tasks.find();
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
