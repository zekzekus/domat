Router.configure({
    layout: 'layout',
    notFoundTemplate: 'notFound',
    loadingTemplate: 'loading',
    before: function() {
        var user = Meteor.user();
        if (!user) {
            this.render(Meteor.loggingIn() ? 'loading' : 'login');
            this.render('header_login', {to: 'header'});
            this.render('footer', {to: 'footer'});
            return this.stop();
        }
    }
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
