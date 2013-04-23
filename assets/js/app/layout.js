define(function(require, exports, module) {
  var $ = require('$');

  function adjustMainHeight() {
    var mainHeight = $(window).innerHeight() - $('#header').outerHeight() - $('#footer').outerHeight();
    $('#sub, #splitter, #container').height(mainHeight);

    var menuHeight = $('#sub').innerHeight() - $('#sub').children().eq(0).outerHeight();
    $('#menuContainer').height(menuHeight - 1);
  }

  function adjustMenuItemHeight() {
    var $menu = $('#menu'),
      $hd = $('.accordion-hd', $menu);
    var height = $('#menuContainer').innerHeight() - $hd.outerHeight() * $hd.length;
    $('.grid-bd', $menu).height(height - 4);
  }

  function adjustContainerWidth() {
    var width = $(window).innerWidth() - $('#sub').outerWidth() - $('#splitter').outerWidth();
    $('#container').width(width - 10);
  }

  function adjustContainerMainHeight() {
    var $container = $('#container'),
      $doc = $container.contents();
    var height = $container.height() - $doc.find('#title').outerHeight();
    $doc.find('#main').height(height - 1);
  }

  $(window).resize(function() {
    adjustMainHeight();
    adjustMenuItemHeight();
    adjustContainerWidth();
    adjustContainerMainHeight();
  });
  adjustMainHeight();
  adjustContainerWidth();
  adjustContainerMainHeight();

  exports.adjustMenuItemHeight = adjustMenuItemHeight;
  exports.adjustContainerWidth = adjustContainerWidth;
});
