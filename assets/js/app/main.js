define(function(require, exports, module) {
  var $ = require('$'),
    handlebars = require('handlebars'),
    Tree = require('tree'),
    Switchable = require('switchable');

  var layout = require('./layout');

  window.$ = $;

  $.getJSON('assets/data/menu.json', function(data) {
    createAccordion(data.data.children);

    new Switchable({
      element: '#menu',
      triggerType: 'click',
      activeTriggerClass: 'accordion-hd-is-active'
    }).render();

  });

  function createAccordion(data) {
    var $menu = $('#menu');
    var html = handlebars.compile(require('./accordion.tpl'))({
      headers: data
    });
    $menu.html(html);

    var $panels = $('.accordion-bd', $menu);
    for (var i = 0; i < data.length; i++) {
      new Tree({
        element: $panels.eq(i),
        data: data[i],
        onRendered: processTree
      }).render();
    }

    function processTree(tree) {
      tree.$('.bd').css('border-width', 0);
    }

    layout.adjustMenuHeight(data.length);
  }

});
