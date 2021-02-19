import { File } from 'nodejs-shared';
import config from '../config/config';

export default class {

  /**
   * Generate URL routing from controller class metadata
   */
  static attach(app, routePath) {
    const paths = File.find(`${routePath}/**/*.js`);
    console.log('paths=', paths);
    for (let path of paths) {
      const { default: router } = require(path);
      const matches = path.match(/\/routes(?:(\/..*))?\/(..*)\.js/);
      if (!matches) continue;
      const [ _, directory, file ] = matches;
      const url = directory ? `${directory}/${file.toLowerCase()}` : `/${file.toLowerCase()}`;
      app.use(url === config.defaultController ? '/' : url, router);
    }
  }
}
