define(function(require, exports, module) {
  var $ = require('$'),
    handlebars = require('handlebars'),
    Tree = require('tree'),
    Switchable = require('switchable');


  window.$ = $;

  function adjustMainHeight() {
    var mainHeight = $(window).innerHeight() - $('#header').outerHeight() - $('#footer').outerHeight();
    $('#sub, #splitter, #container').height(mainHeight);
  }

  var menuLength;
  function adjustMenuHeight() {
    var $menu = $('#menu');
    var hdHeight = $('.accordion-hd', $menu).outerHeight(),
      titleHeight = $menu.prev().outerHeight();
    var height = $menu.parent().innerHeight() - titleHeight - hdHeight * menuLength;
    $('.grid-bd', $menu).height(height - 4);
  }

  $(window).resize(function() {
    adjustMainHeight();
    adjustMenuHeight();
  });
  adjustMainHeight();

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

    menuLength = data.length;
    adjustMenuHeight();
  }

});
