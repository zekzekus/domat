Notifications = new Meteor.Collection(null);

throwNotify = function(message, type) {
    Notifications.insert({message: message, type: type, seen: false});
};

throwError = function(message) {
    throwNotify(message, 'error');
};

throwWarning = function(message) {
    throwNotify(message, 'warning');
};

throwInfo = function(message) {
    throwNotify(message, 'info');
};

clearNotifications = function() {
    Notifications.remove({seen: true});
}
