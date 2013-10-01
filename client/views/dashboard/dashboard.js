Template.dashboard.helpers({
    timerValue: function() {
        return Session.get('timer');
    }
});


Meteor.startup(function() {
    Session.set('timer', 25);
});

Template.dashboard.events({
    'click #btn-reset': function(e) {
        Session.set('timer', 25);
        Meteor.clearInterval(Session.get('timerHandle'));
    },
    'click #btn-start': function(e) {
        var timerHandle = Meteor.setInterval(function() {
            currentVal = Session.get('timer');
            if (currentVal > 0) {
                Session.set('timer', currentVal - 1);
            }
        }, 1000);
        Session.set('timerHandle', timerHandle);
    }
});
