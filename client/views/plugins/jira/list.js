Template.issues.helpers({
    jira_loading: function() {
        return Session.get('jira_loading');
    },
    issues: function() {
        return JiraIssues.find();
    }
});
