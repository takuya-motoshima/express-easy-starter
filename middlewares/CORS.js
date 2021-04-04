/**
 * Enables the CORS.
 */
export default class {
  /**
   * Mount on application.
   */
  static mount(app) {
    app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', req.headers.origin);
      res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
      res.header('Access-Control-Allow-Credentials', 'true');
      next();
    });
  }
}