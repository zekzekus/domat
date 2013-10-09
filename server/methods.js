Meteor.methods({
    addTask: function(taskAttributes) {
        var user = Meteor.user();

        if (!user) {
            throw new Meteor.Error(401, "Login to add task!");
        }

        if (!taskAttributes.description) {
            throw new Meteor.Error(422, "Enter a description for the task!");
        }

        var task = _.extend(_.pick(taskAttributes, 'description'), {
            assignee: user.services.google.email,
            timestamp: new Date().getTime(),
            completed_pomodoros: 0,
            completed: false
        });

        var taskId = Tasks.insert(task);

        return taskId;
    }
});
