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
            clearNotifications();
        }
    });
    this.route('reports', {
        renderTemplates: {
            'header': {to: 'header'},
            'navmenu': {to: 'navmenu'},
            'footer': {to: 'footer'}
        },
        onAfterRun: function() {
            clearNotifications();
        }
    });
    this.route('login', {
        renderTemplates: {
            'header_login': {to: 'header'}
        },
        onAfterRun: function() {
            clearNotifications();
        }
    });
    this.route('profile', {
        renderTemplates: {
            'header': {to: 'header'},
            'navmenu': {to: 'navmenu'},
            'footer': {to: 'footer'}
        },
        onAfterRun: function() {
            clearNotifications();
        }
    });
    this.route('timer', {
        renderTemplates: {
            'header': {to: 'header'},
            'navmenu': {to: 'navmenu'},
            'footer': {to: 'footer'}
        },
        onAfterRun: function() {
            clearNotifications();
        }
    });
});
