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
      classPrefix: '',
      activeTriggerClass: 'accordion-hd-is-active',
      onSwitched: function(toIndex, fromIndex) {
        this.triggers.eq(fromIndex).find('[data-role=flag]').addClass('icon-tool-plus').removeClass('icon-tool-minus');
        this.triggers.eq(toIndex).find('[data-role=flag]').addClass('icon-tool-minus').removeClass('icon-tool-plus');
      }
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
      var tree = new Tree({
        parentNode: $panels.eq(i),
        data: data[i],
        model: {
          width: '100%',
          showRoot: false
        },
        onLoaded: onLoaded,
        onClick: click
      }).render();
    }

    function onLoaded() {
      this.$('.panel-bd').css('border-width', 0);
    }

    function click(target, data) {
      if (data.uri) {
        $('#container').attr('src', 'view/' + data.uri + '.html').load(function() {
          //layout.adjustContainerMainHeight();
        });
      }
    }

    //layout.adjustMenuItemHeight();
  }

  $('#sub [data-role=toggle],#splitter [data-role=toggle]').click(function() {

    function toggle(method, width, newIconClass, oldIconClass, newSplitClass, oldSplitClass) {
      $('#sub').animate({
        width: width
      }, {
        progress: function() {
          //layout.adjustContainerWidth();
        },
        complete: function() {
          $('#sub [data-role=toggle]').attr('data-status', method).addClass(newIconClass).removeClass(oldIconClass).siblings()[method]();
          $('#menu')[method]();
          $('#splitter [data-role=toggle]').attr('data-status', method).addClass(newSplitClass).removeClass(oldSplitClass);
        }
      });
    }

    if ($(this).attr('data-status') == 'show') {
      toggle('hide', 27, 'icon-tool-right', 'icon-tool-left', 'splitter-mini-right', 'splitter-mini-left');
    } else {
      toggle('show', 200, 'icon-tool-left', 'icon-tool-right', 'splitter-mini-left', 'splitter-mini-right');
    }
  });

});
