Meteor.publish('tasks', function() {
    return Tasks.find();
});

Tasks.allow({
    insert: function(userId, doc) {
        return !! userId;
    },
    remove: function(userId, doc) {
        if (Meteor.user().services.google.email === doc.assignee) {
            return true;
        }
        return false;
    },
    update: function(userId, doc, fields, modifiers) {
        if (Meteor.user().services.google.email === doc.assignee) {
            return true;
        }
        return false;
    }
});

Meteor.publish("userData", function () {
  return Meteor.users.find({_id: this.userId},
                           {fields: {'profile': 1, 'services.google.email': 1}});
});
