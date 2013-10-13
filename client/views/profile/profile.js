Template.profile.events({
    'submit form': function(e) {
        e.preventDefault();
        var work = $('#workDuration').val();
        var shortB = $('#shortDuration').val();
        var longB = $('#longDuration').val();

        var user = Meteor.user();

        if (!user) {
            throwError('You must login!');
            return false;
        }

        var settings = Settings.findOne({user_id: user._id});

        if (settings) {
            Settings.update(settings._id, {$set: {
                workDuration: work,
                shortBreakDuration: shortB,
                longBreakDuration: longB
            }});
        } else {
            Settings.insert({
                user_id: user._id,
                workDuration: work,
                shortBreakDuration: shortB,
                longBreakDuration: longB
            });
        }

        throwSuccess('Settings saved!');
        
        return true;
    }
});

Template.profile.helpers({
    settings: function() {
        return Settings.findOne({user_id: Meteor.user()._id});
    }
});
