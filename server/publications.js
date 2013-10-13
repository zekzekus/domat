Meteor.publish('tasks', function() {
    return Tasks.find({owner: this.userId});
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

Meteor.publish('settings', function() {
    return Settings.find({user_id: this.userId});
});

Settings.allow({
    insert: function(userId, doc) {
        return userId === doc.user_id;
    },
    update: function(userId, doc, fields, modifiers) {
        return userId === doc.user_id;
    }
});
