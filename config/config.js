export default {
  envPath: '.env',
  enableCors: true,
  enableView: true,
  maxBodySize: '100mb',
  defaultController: '/dashboard',
  userAuthentication: {
    enabled: true,
    username: 'email',
    password: 'password',
    successRedirect: '/',
    failureRedirect: '/login',
    exclude: [
      '/test',
      '/api'
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
  overrideBaseUrl: (baseUrl) => baseUrl
}