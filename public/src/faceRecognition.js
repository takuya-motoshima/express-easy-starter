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
    columnDefs: [ { targets:2, orderable: false, searchable: false } ],
    buttons: [{
      text: 'Add collection',
      action: async () => {
        const id = prompt('Please enter a collection ID.', '');
        const result = await faceCollectionsApi.post({ id });
        alert('Added new collection');
        dt.addRow($(template(result)));
      }
    }],
    order: [[ 1, 'asc' ] ]
  });
}

async function loadData() {
  const collections = await faceCollectionsApi.query();
  for (let collection of collections) {
    dt.addRow($(template(collection)));
  }
}

const template = Template.create($('#template').html());
const dt = setupTable();
const faceCollectionsApi = new FaceCollectionsApi();
loadData();