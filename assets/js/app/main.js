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
        showRoot: false,
        onRendered: processTree
      }).render();
    }

    function processTree(tree) {
      tree.$('.bd').css('border-width', 0);
    }

    layout.adjustMenuItemHeight();
  }

  $('#sub [data-role=toggle],#splitter [data-role=toggle]').click(function() {

    function toggle(method, width, newIconClass, oldIconClass, newSplitClass, oldSplitClass) {
      $('#sub').animate({
        width: width
      }, {
        progress: function() {
          layout.adjustContainerWidth();
        },
        complete: function() {
          $('#sub [data-role=toggle]').attr('data-status', method).addClass(newIconClass).removeClass(oldIconClass).siblings()[method]();
          $('#menu')[method]();
          $('#splitter [data-role=toggle]').attr('data-status', method).addClass(newSplitClass).removeClass(oldSplitClass);
        }
      });
    }

    if ($(this).attr('data-status') == 'show') {
      toggle('hide', 27, 'icon-tool-expand-right', 'icon-tool-collapse-left', 'splitter-mini-right', 'splitter-mini-left');
    } else {
      toggle('show', 200, 'icon-tool-collapse-left', 'icon-tool-expand-right', 'splitter-mini-left', 'splitter-mini-right');
    }
  });

});
