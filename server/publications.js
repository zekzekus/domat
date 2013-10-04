Meteor.publish('tasks', function() {
    return Tasks.find();
});
