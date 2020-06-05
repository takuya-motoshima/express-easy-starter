import $ from 'jquery';
import 'datatables.net-bs4';
import 'datatables.net-buttons-bs4';

export default class {
  constructor($table, option = {}) {
    console.log('option=', option);
    if (!($table instanceof jQuery)) {
      $table = $(table);
    }
    $.fn.DataTable.ext.pager.numbers_length = 4;
    this.dt = $table.DataTable({
      responsive: true,
      pageLength: 10,
      columnDefs: option.columnDefs || undefined,
      order: option.order || undefined,
      buttons: option.buttons || [],
      dom: "<'row be-datatable-header'<'col-sm-6'f><'col-sm-6 text-right'B>><'row be-datatable-body'<'col-sm-12'tr>><'row be-datatable-footer'<'col-sm-5'i><'col-sm-7'p>>"
    });
  }

  addRow($row) {
    if (!($row instanceof jQuery)) $row = $($row);
    this.dt.row.add($row).draw();
    return this;
  }

  updateRow($row, set) {
    if (!($row instanceof jQuery)) $row = $($row);
    const row = this.dt.row($row.get(0));
    if ($.isPlainObject(set)) {
      set = Object.assign(row.data(), set);
    } else if (typeof set === 'string') {
      set = $(set).find('td').map((i, element) => element.innerHTML).get();
    }
    row.data(set).draw();
    return this;
  }

  async deleteRow($row) {
    if (!($row instanceof jQuery)) $row = $($row);
    await new Promise(resolve => {
      $row.fadeOut(400, () => {
        this.dt.row($row).remove().draw();
        resolve();
      });
    });
    return this;
  }

  getRowData($row, index) {
    if (!($row instanceof jQuery)) $row = $($row);
    const rowData = this.dt.row($row.get(0)).data();
    return index ? rowData[index] : rowData;
  }
}