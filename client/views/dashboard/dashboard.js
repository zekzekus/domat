Template.dashboard.helpers({
    timerValue: function() {
        return Session.get('timer');
    }
});

Template.dashboard.events({
    'click #btn-pomodoro': function(e) {
        Router.dispatch('/timer');
    }
});
