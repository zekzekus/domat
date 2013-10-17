Meteor.methods({
    addTask: function(taskAttributes) {
        var user = Meteor.user();

        if (!user) {
            throw new Meteor.Error(401, "Login to add task!");
        }

        if (!taskAttributes.description) {
            throw new Meteor.Error(422, "Enter a description for the task!");
        }

        var task = _.extend(_.pick(taskAttributes, 'description'), {
            assignee: user.services.google.email,
            timestamp: new Date().getTime(),
            completed_pomodoros: 0,
            completed: false,
            owner: user._id
        });

        var taskId = Tasks.insert(task);

        return taskId;
    },
    testHTTP: function() {
        var fut = new Future();

        var JiraApi = Meteor.require('jira').JiraApi;
        var settings = Settings.findOne({user_id: Meteor.user()._id});

        if (_.isUndefined(settings) || _.isNull(settings)) {
            throw new Meteor.Error(404, "JIRA settings not found!");
        }

        var jira = new JiraApi('http',
                               settings.jiraHost, 80,
                               settings.jiraUsername, settings.jiraPassword,
                               '2');
        jira.listProjects(function(error, result) {
            fut['return'](result);
        });

        return fut.wait();
    }
});
