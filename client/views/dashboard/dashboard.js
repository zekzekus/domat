Template.dashboard.events({
    'click #btn-pomodoro': function(e) {
        initPomodoro();
        $('#myModal').modal({keyboard: false});
    }
});
