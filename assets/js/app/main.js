define(function(require, exports, module) {
  var $ = require('$'),
    handlebars = require('handlebars'),
    Tree = require('tree'),
    Switchable = require('switchable');

  $.getJSON('assets/data/menu.json', function(data) {
    createAccordion(data.data.children);

    new Switchable({
      element: '#menu',
      triggerType: 'click',
      activeTriggerClass: 'accordion-hd-is-active'
    }).render();

  });

  function createAccordion(data) {
    var html = handlebars.compile(require('./accordion.tpl'))({
      headers: data
    });
    $('#menu').html(html);

    var $panels = $('#menu .accordion-bd');
    for (var i = 0; i < data.length; i++) {
      new Tree({
        element: $panels.eq(i),
        data: data[i]
      }).render();
    }
  }
});
