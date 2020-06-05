import '~/faceRecognition.css';
import $ from 'jquery';
import 'bootstrap';
import FaceCollectionsApi from '~/shared/FaceCollectionsApi'
import DataTable from '~/shared/DataTable';
import Template from '~/shared/Template';

function setupTable() {
  const $table = $('#table');
  $table.on('click', '[action-delete]', async event => {
    if (!confirm('Do you want to delete the collection?')) return;
    const $row = $(event.currentTarget).closest('tr');
    await faceCollectionsApi.delete($row.data('id'));
    alert('Deleted collection');
    await dt.deleteRow($row);
  });
  return new DataTable($table, {
    columnDefs: [ { targets:1, orderable: false, searchable: false } ],
    buttons: [{
      text: 'Add collection',
      className: 'btn-primary',
      action: () => {
        const id = prompt('Please enter a collection ID.', '');
        console.log(id);
      }
    }],
    order: [[ 1, 'asc' ] ]
  });
}

async function loadData() {
  const collections = await faceCollectionsApi.query();
  for (let collection of collections) {
    dt.addRow($(teamplate(collection)));
  }
}

const teamplate = Template.create($('#teamplate').html());
const dt = setupTable();
const faceCollectionsApi = new FaceCollectionsApi();
loadData();