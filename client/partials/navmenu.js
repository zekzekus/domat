if (Handlebars) {
    Handlebars.registerHelper('ifCurrentPath', function(path) {
        return path === Router.current().path;
    });
}
