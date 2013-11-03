JiraClient = function(options) {
    this.options = options || {};

    this.protocol = options.protocol || "https";
    this.host = options.host;
    this.port = options.port || 443;
    this.version = options.version || "2";
    this.username = options.username;
    this.password = options.password;
};

JiraClient.prototype.__makeUrl = function(endpoint) {
    return this.protocol + "://" + this.host + ":" + this.port + "/rest/api/" +
    this.version + "/" + endpoint;
};

JiraClient.prototype.search = function(searchString) {
    var uri = this.__makeUrl("search");
    var data = {
        jql: searchString,
        startAt: 0,
        maxResults: 50,
        fields: ["summary", "status", "assignee", "description"]
    };

    var result = HTTP.call("post", uri, {
        auth: this.username + ":" + this.password,
        data: data
    });

    return result.data;
};
