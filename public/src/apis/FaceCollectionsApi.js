import Api from '~/shared/Api';

export default class extends Api {
  get resource() {
    return '/api/faceCollections';
  }
}