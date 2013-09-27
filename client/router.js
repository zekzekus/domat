Router.configure({
  layout: 'layout',

  notFoundTemplate: 'notFound',

  loadingTemplate: 'loading'

});

Router.map(function() {
    this.route('dashboard', {path: '/'});
    this.route('reports');
});
