if (Handlebars) {
    Handlebars.registerHelper('ifCurrentPath', function(path) {
        console.log(path);
        return path === Router.current().path;
    });
}
