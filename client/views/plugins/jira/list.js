Template.issues.helpers({
    jira_loading: function() {
        return Session.get('jira_loading');
    },
    issues: function() {
        return JiraIssues.find();
    }
});

Template.issue.events({
    'click .issue-select': function(e) {
        var task = {
            _id: this._id,
            description: this.fields.summary,
            jira_key: this.key,
            jira_id: this.id
        };

        Meteor.call('addTask', task, function(error, id) {
            if (error) {
                throwError(error.reason);
            }
            JiraIssues.update(task._id, {$set: {added: true}});
        });
    }
});
