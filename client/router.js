Router.configure({
    layout: 'layout',
    notFoundTemplate: 'notFound',
    loadingTemplate: 'loading'
});

Router.map(function() {
    this.route('dashboard', {
        path: '/',
        renderTemplates: {
            'header': {to: 'header'},
            'navmenu': {to: 'navmenu'},
            'footer': {to: 'footer'}
        },
        onAfterRun: function() {
            clearErrors();
        }
    });
    this.route('reports', {
        renderTemplates: {
            'header': {to: 'header'},
            'navmenu': {to: 'navmenu'},
            'footer': {to: 'footer'}
        },
        onAfterRun: function() {
            clearErrors();
        }
    });
    this.route('login', {
        renderTemplates: {
            'header_login': {to: 'header'}
        },
        onAfterRun: function() {
            clearErrors();
        }
    });
});
