export default {
  env: '.env',
  CORS: true,
  maxRequestBodySize: '100mb',
  defaultController: '/index',
  userSignin: {
    enabled: true,
    usernameField: 'email',
    passwordField: 'password',
    successRedirect: '/',
    failureRedirect: '/signin',
    unauthenticatedUrl: [
      '/test/is-db-connect'
    ]
  }
}
