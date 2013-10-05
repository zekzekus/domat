Template.errors.helpers({
    errors: function() {
        return Notifications.find();
    }
});

Template.error.rendered = function() {
    var error = this.data;
    Meteor.defer(function() {
        Notifications.update(error._id, {$set: {seen: true}});
    });
}
