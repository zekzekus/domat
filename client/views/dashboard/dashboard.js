Template.dashboard.events({
    'click #btn-pomodoro': function(e) {
        Meteor.call('testHTTP', function(error, result) {
            console.log(error);
            console.log(result);
        });
        initPomodoro();
        $('#myModal').modal({keyboard: false});
    }
});
