Router.configure({
    layoutTemplate: 'layout',
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
    },
    after: function() {
        clearNotifications();
    }
});

Router.map(function() {
    this.route('dashboard', {
        path: '/',
        yieldTemplates: {
            'header': {to: 'header'},
            'navmenu': {to: 'navmenu'},
            'footer': {to: 'footer'}
        }
    });
    this.route('reports', {
        yieldTemplates: {
            'header': {to: 'header'},
            'navmenu': {to: 'navmenu'},
            'footer': {to: 'footer'}
        }
    });
    this.route('login', {
        yieldTemplates: {
            'header_login': {to: 'header'}
        }
    });
    this.route('profile', {
        yieldTemplates: {
            'header': {to: 'header'},
            'navmenu': {to: 'navmenu'},
            'footer': {to: 'footer'}
        }
    });
    this.route('timer', {
        yieldTemplates: {
            'header': {to: 'header'},
            'navmenu': {to: 'navmenu'},
            'footer': {to: 'footer'}
        }
    });
});
