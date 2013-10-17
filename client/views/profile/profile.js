Template.profile.events({
    'submit form[name=settingsTimer]': function(e) {
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

        throwSuccess('Timer Settings saved!');

        return true;
    },
    'submit form[name=settingsJira]': function(e) {
        e.preventDefault();
        var host = $('#jiraHost').val();
        var username = $('#jiraUsername').val();
        var password = $('#jiraPassword').val();

        var user = Meteor.user();

        if (!user) {
            throwError('You must login!');
            return false;
        }

        var settings = Settings.findOne({user_id: user._id});

        if (settings) {
            Settings.update(settings._id, {$set: {
                jiraHost: host,
                jiraUsername: username,
                jiraPassword: password
            }});
        } else {
            Settings.insert({
                user_id: user._id,
                jiraHost: host,
                jiraUsername: username,
                jiraPassword: password
            });
        }

        throwSuccess('JIRA Settings saved!');

        return true;
    }

});

Template.profile.helpers({
    settings: function() {
        return Settings.findOne({user_id: Meteor.user()._id});
    }
});
