export default {
  env: '.env',
  cors: true,
  useView: true,
  maxRequestBodySize: '100mb',
  defaultController: '/welcome',
  authentication: {
    enabled: true,
    usernameField: 'email',
    passwordField: 'password',
    loginSuccessfulUrl: '/',
    loginFailureUrl: '/login',
    exclude: [
      '/test',
      '/test/is-db-connect',
      '/test/foo',
      '/test/bar',
      '/test/error'
    ]
  }
}
