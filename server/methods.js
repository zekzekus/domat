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
    getUsersIssues: function() {
        var user = Meteor.user();
        if (!user) {
            throw new Meteor.Error(401, "Not logged in!");
        }

        var settings = Settings.findOne({user_id: user._id});

        var client = new JiraClient({
            host: settings.jiraHost,
            username: settings.jiraUsername,
            password: settings.jiraPassword
        });

        var jql = "assignee=" + settings.jiraUsername.replace(".", "\\u002e");
        jql += ' AND status in (Open, "In Progress", Reopened, New)';
        return client.search(jql);
    }
});
