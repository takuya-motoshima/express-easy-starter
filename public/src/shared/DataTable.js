import $ from 'jquery';
import 'datatables.net';

export default class {

  constructor($table, option = {}) {
    if (!($table instanceof jQuery)) {
      $table = $(table);
    }
    $.fn.DataTable.ext.pager.numbers_length = 4;
    let columns = (new Array($table.find('thead th').length)).fill({ orderable: true, searchable: true });
    if (option.columns) {
      Object.assign(columns, option.columns);
    }
    const buttons = [
      // 'copy',
      // 'csv',
      // 'excel',
      // 'pdf',
      // 'print'
    ];
    if (option.buttons) {
      buttons.unshift(...option.buttons);
    }
    this.dataTable = $table.DataTable({
      responsive: true,
      pageLength: 50,
      columns,
      order: option.order || undefined,
      buttons,
      dom: "<'row be-datatable-header'<'col-sm-6'f><'col-sm-6 text-right'B>><'row be-datatable-body'<'col-sm-12'tr>><'row be-datatable-footer'<'col-sm-5'i><'col-sm-7'p>>",
      language: {
        "sEmptyTable":     "データがありません",
        "sInfo":           " _TOTAL_ 件中 _START_ から _END_ まで表示",
        "sInfoEmpty":      " 0 件中 0 から 0 まで表示",
        "sInfoFiltered":   "（全 _MAX_ 件より抽出）",
        "sInfoPostFix":    "",
        "sInfoThousands":  ",",
        "sLengthMenu":     "_MENU_ 件表示",
        "sLoadingRecords": "読み込み中...",
        "sProcessing":     "処理中...",
        "sSearch":         "検索:",
        "sZeroRecords":    "一致するデータがありません",
        "oPaginate": {
          "sFirst":    "先頭",
          "sLast":     "最終",
          "sNext":     "次",
          "sPrevious": "前"
        },
        "oAria": {
        "sSortAscending":  ": 列を昇順に並べ替えるにはアクティブにする",
        "sSortDescending": ": 列を降順に並べ替えるにはアクティブにする"
        }
      }
    });
  }

  addRow($row) {
    if (!($row instanceof jQuery)) $row = $($row);
    this.dataTable.row.add($row).draw();
    return this;
  }

  updateRow($row, set) {
    if (!($row instanceof jQuery)) $row = $($row);
    const row = this.dataTable.row($row.get(0));
    if ($.isPlainObject(set)) {
      set = Object.assign(row.data(), set);
    } else if (typeof set === 'string') {
      set = $(set).find('td').map((i, element) => element.innerHTML).get();
    }
    row
      .data(set)
      .draw();
    return this;
  }

  async deleteRow($row) {
    if (!($row instanceof jQuery)) $row = $($row);
    await new Promise(resolve => {
      $row.fadeOut(400, () => {
        this.dataTable.row($row).remove().draw();
        resolve();
      });
    });
    return this;
  }

  getRowData($row, index) {
    if (!($row instanceof jQuery)) $row = $($row);
    const rowData = this.dataTable.row($row.get(0)).data();
    return index ? rowData[index] : rowData;
  }
}