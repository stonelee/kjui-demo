seajs.config({
  preload: ['seajs/plugin-text'],
  alias: {
    '$': 'gallery/jquery/1.8.2/jquery',
    handlebars: 'gallery/handlebars/1.0.0/handlebars',
    widget: 'arale/widget/1.0.2/widget',
    switchable: 'arale/switchable/0.9.12/switchable',
    grid: 'kjui/grid/1.0.0/grid',
    tree: 'kjui/tree/1.0.0/tree'
  }
});

seajs.use('./assets/js/app/main/main');
