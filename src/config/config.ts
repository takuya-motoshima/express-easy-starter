export default {
  envPath: '.env',
  enableCors: true,
  enableView: true,
  maxBodySize: '100mb',
  defaultController: '/welcome',
  userAuthentication: {
    enabled: true,
    username: 'email',
    password: 'password',
    successRedirect: '/',
    failureRedirect: '/login',
    exclude: [
      '/test',
      '/test/is-db-connect',
      '/test/foo',
      '/test/bar',
      '/test/error'
    ]
  },
  /**
   * Functions that override baseUrl
   * Extend the baseUrl obtained by app.js.
   * The default for baseUrl is referrer origin (eg https://example.com).
   * 
   * @example
   * overrideBaseUrl: (baseUrl: string): string => `${baseUrl}/myapp`
   */
  overrideBaseUrl: (baseUrl: string): string => baseUrl
}