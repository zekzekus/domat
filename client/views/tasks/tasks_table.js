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

Template.tasksTable.helpers({
    tasks: function() {
        return Tasks.find({}, {sort: {timestamp: -1}});
    }
});

Template.tasksTable.events({
    'keyup #inp-new-task': function(e) {
        if (e.which === 13) {
            var taskDescription = e.target.value;
            if (!Meteor.user()) {
                throwError('Please login to create task!');
            } else {
                Tasks.insert({
                    description: taskDescription,
                    assignee: Meteor.user().services.google.email,
                    completed_pomodoros: 0,
                    completed: false,
                    timestamp: (new Date()).getTime()
                });
                e.target.value = "";
            }
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
        Session.set('editing_task', this._id);
        Deps.flush();
        t.find('#task-input').focus();
        t.find('#task-input').select();
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
    }
});

