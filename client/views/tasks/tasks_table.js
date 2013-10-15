if (Meteor.isClient) {
    Meteor.startup(function() {
        Session.set('linked_id', undefined);
    });
}

// Returns an event map that handles the "escape" and "return" keys and
// "blur" events on a text input (given by selector) and interprets them
// as "ok" or "cancel".
var okCancelEvents = function (selector, callbacks) {
    var ok = callbacks.ok || function () {};
    var cancel = callbacks.cancel || function () {};

    var events = {};
    events['keyup '+selector+', keydown '+selector+', focusout '+selector] =
        function (evt) {
        if (evt.type === "keydown" && evt.which === 27) {
            // escape = cancel
            cancel.call(this, evt);

        } else if (evt.type === "keyup" && evt.which === 13 ||
                   evt.type === "focusout") {
            // blur/return/enter = ok/submit if non-empty
            var value = String(evt.target.value || "");
            if (value)
                ok.call(this, value, evt);
            else
                cancel.call(this, evt);
        }
    };

    return events;
};

Template.tasksTable.rendered = function() {
    $('.task-description').tooltip();
    $('#btn-reload').tooltip();
};

Template.tasksTable.helpers({
    tasks: function() {
        return Tasks.find({}, {sort: {timestamp: -1}});
    }
});

Template.tasksTable.events({
    'keyup #inp-new-task': function(e) {
        if (e.which === 13) {
            var task = {
                description: e.target.value
            };
            Meteor.call('addTask', task, function(error, id) {
                if (error) {
                    throwError(error.reason);
                } else {
                    e.target.value = "";

                }
            });
        }
    }
});

Template.taskItem.events({
    'click #btn-complete': function(e) {
        Tasks.update(this._id, {$set: {completed: !this.completed}});
    },
    'click #btn-delete': function(e) {
        Tasks.remove(this._id);
    },
    'dblclick .task-description': function(e, t) {
        if (this.completed) {
            alert('Task is completed. Not editable!');
        } else {
            Session.set('editing_task', this._id);
            Deps.flush();
            t.find('#task-input').focus();
            t.find('#task-input').select();
        }
    },
    'click #btn-link': function(e) {
        if (this.completed) {
            throwWarning('Task already completed!');
        } else {
            if (Session.get('linked_id') === undefined) {
                Session.set('linked_id', this._id);
                initPomodoro();
                $('#myModal').modal({keyboard: false});
            } else {
                Session.set('linked_id', undefined);
            }
        }
    }
});

Template.taskItem.events(okCancelEvents(
    '#task-input',
    {
        ok: function(value) {
            Tasks.update(this._id, {$set: {description: value}});
            Session.set('editing_task', null);
        },
        cancel: function() {
            Session.set('editing_task', null);
        }
    }
));

Template.taskItem.helpers({
    editing: function() {
        return Session.equals('editing_task', this._id);
    },
    linked: function() {
        return Session.equals('linked_id', this._id);
    }
});
