Template.dashboard.events({
    'click #btn-pomodoro': function(e) {
        // Meteor.call('testHTTP', function(error, result) {
        //     console.log(error);
        //     console.log(result);
        // });
        var task = Tasks.findOne({_id: Session.get('linked_id')});
        initPomodoro(task);
        $('#myModal').modal({keyboard: false});
    }
});
