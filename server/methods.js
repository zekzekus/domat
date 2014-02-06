Meteor.methods({
    addTask: function(taskAttributes) {
        var user = Meteor.user();

        if (!user) {
            throw new Meteor.Error(401, "Login to add task!");
        }

        if (!taskAttributes.description) {
            throw new Meteor.Error(422, "Enter a description for the task!");
        }

        var task = _.extend(_.pick(taskAttributes, 'description', 'jira_key', 'jira_id'), {
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
        this.unblock();
        var user = Meteor.user();
        if (!user) {
            throw new Meteor.Error(401, "Not logged in!");
        }

        var settings = Settings.findOne({user_id: user._id});

        var client = new JiraClient({
            host: settings.jiraHost,
            username: settings.jiraUsername,
            authHeader: settings.jiraAuthHeader
        });

        var jql = "assignee=" + settings.jiraUsername.replace(".", "\\u002e");
        jql += ' AND status in (Open, "IN PROGRESS BY DEVELOPER", Reopened, New, NEW)';
        return client.search(jql);
    },
    updateJiraSettings: function(host, username, password) {
        var user = Meteor.user();
        var settings = Settings.findOne({user_id: user._id});

        var authHeader = new Buffer(username + ":" + password).
            toString('base64');

        if (settings) {
            Settings.update(settings._id, {$set: {
                jiraHost: host,
                jiraUsername: username,
                jiraAuthHeader: authHeader
            }});
        } else {
            Settings.insert({
                user_id: user._id,
                jiraHost: host,
                jiraUsername: username,
                jiraAuthHeader: authHeader
            });
        }
        return true;
    }
});
