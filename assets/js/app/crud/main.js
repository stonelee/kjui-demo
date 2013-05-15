define(function(require, exports, module) {
  var $ = require('$'),
    Dialog = require('dialog'),
    Grid = require('grid');

  var fields = [{
    header: '编号',
    name: 'id',
    align: 'center',
    sort: true
  }, {
    header: '验票站名称',
    name: 'stationName',
    width: 150
  }, {
    header: '矿企名称',
    name: 'mineName'
  }, {
    header: '车牌号',
    name: 'licensePlateNumber',
    width: 80
  }, {
    header: '矿种',
    name: 'coalType'
  }, {
    header: '毛重',
    name: 'grossWeight',
    render: function(value) {
      return '<b>' + value + '吨</b>';
    }
  }, {
    header: '过站时间',
    name: 'transitDate',
    width: 80,
    sort: 'desc',
    render: function(value) {
      return value.split('T')[0];
    }
  }, {
    header: '详细信息',
    name: 'id',
    align: 'center',
    render: function(value) {
      return '<img data-role="detail" src="../assets/images/icons/application_view_detail.png" width="16" title="详细信息" style="vertical-align:middle;cursor:pointer;">';
    }
  }];

  new Grid({
    parentNode: '#grid',
    url: '../assets/data/grid_1.json',
    urlParser: /(grid_)\d+(.*)/,
    model: {
      fields: fields,
      title: '表格',
      height: 190
    },
    onClick: function(target, data) {
      if (target.attr('data-role') == 'detail') {
        console.log(data);
      }
      if (this.selected) {
        $('#edit, #del').removeClass('disabled');
      } else {
        $('#edit, #del').addClass('disabled');
      }
    },
    onSort: function(name, direction) {
      console.log(name, direction);
    },
    afterRender: function() {
      var self = this;
      this.$('.grid-hd').before($('#toolbar').html());

      $('.toolbar-btn').click(function(e) {
        if ($(this).hasClass('disabled')) {
          e.stopImmediatePropagation();
        }
      });

      new Dialog({
        trigger: '#add',
        template: require('./form.tpl'),
        hasMask: false,
        closeTpl: ' ',
        content: $('#form').html()
      });

      //$('#add').click(function() {
        //console.log('add');
      //});
      $('#edit').click(function() {
        console.log(self.selected.data('data'));
      });
      $('#del').click(function() {
        console.log('delete ' + self.selected.data('data').id);
      });
    },
    onLoaded: function() {
      $('#edit, #del').addClass('disabled');
    }
  }).render();


});
