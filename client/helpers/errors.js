Notifications = new Meteor.Collection(null);

throwNotify = function(message, type) {
    Notifications.insert({message: message, type: type, seen: false});
    Meteor.setTimeout(function() {
        $('.alert-' + type).alert('close');
    }, 5000);
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

throwSuccess = function(message) {
    throwNotify(message, 'success');
};

clearNotifications = function() {
    Notifications.remove({seen: true});
}
