import '~/styles/faceRecognition.css';
import $ from 'jquery';
import 'bootstrap';
import FaceCollectionsApi from '~/apis/FaceCollectionsApi'

(async () => {

  $('a[data-toggle="pill"]').on('shown.bs.tab', () => {
    console.log('show');
  });

  const faceCollectionsApi = new FaceCollectionsApi();
  const collections = await faceCollectionsApi.query();
  console.log('collections=', collections);
})();

