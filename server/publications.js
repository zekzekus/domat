Meteor.publish('tasks', function() {
    return Tasks.find();
});

Meteor.publish("userData", function () {
  return Meteor.users.find({_id: this.userId},
                           {fields: {'profile': 1, 'services.google.email': 1}});
});
