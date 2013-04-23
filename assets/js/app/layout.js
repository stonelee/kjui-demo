define(function(require, exports, module) {
  var $ = require('$');

  function adjustMainHeight() {
    var height = $(window).innerHeight() - $('#header').outerHeight() - $('#footer').outerHeight();
    $('#sub, #splitter, #container').height(height);
  }

  var menuLength;

  function adjustMenuHeight(len) {
    menuLength = len || menuLength;
    var $menu = $('#menu');
    var hdHeight = $('.accordion-hd', $menu).outerHeight(),
      titleHeight = $menu.prev().outerHeight();
    var height = $menu.parent().innerHeight() - titleHeight - hdHeight * menuLength;
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
    adjustMenuHeight();
    adjustContainerWidth();
    adjustContainerMainHeight();
  });
  adjustMainHeight();
  adjustContainerWidth();
  adjustContainerMainHeight();

  exports.adjustMenuHeight = adjustMenuHeight;
});
