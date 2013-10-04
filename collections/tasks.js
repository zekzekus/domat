Tasks = new Meteor.Collection('tasks');
Tasks.allow({
    insert: function(userId, doc) {
        return !! userId;
    },
    remove: function(userId, doc) {
        return !! userId;
    }
});
