Meteor.publish('tasks', function() {
    return Tasks.find();
});
Tasks.allow({
    insert: function(userId, doc) {
        return !! userId;
    },
    remove: function(userId, doc) {
        return !! userId;
    },
    update: function(userId, doc) {
        return !! userId;
    }
});

Meteor.publish("userData", function () {
  return Meteor.users.find({_id: this.userId},
                           {fields: {'profile': 1, 'services.google.email': 1}});
});
