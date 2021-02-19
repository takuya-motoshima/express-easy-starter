# Changelog

## [0.0.8] - 2021-2-19

* Refactor the model, router and app.js.

## [0.0.7] - 2020-6-18

* Added a method to set a URL that can be accessed without authentication for user authentication.

    URLs that do not require authentication, such as sign-up pages, can be set to "authentication.exclude".

    **config/config.js:**

    ```js
    authentication: {
      enabled: true,
      usernameField: 'email',
      passwordField: 'password',
      loginSuccessfulUrl: '/',
      loginFailureUrl: '/signin',
      exclude: [
        '/signup'
      ]
    }
    ```

* Add DB connection judgment method to DB class (shared/Database).

    ```js
    import Database from '../shared/Database';

    const isConnect = await Database.isConnect();
    ```

## [0.0.6] - 2020-6-7

* Added features for user sign-in and sign-out.

* Added information about environment variables (.env) to "Getting Started".

* Fixed a typo in the usage of View.

    File views/index.hbs:

    ```html
    <!-- After: -->
    {{!< default}}
    ...
    {{#contentFor 'script'}}<script src="script.js"></script>{{/contentFor}}

    <!-- Before: -->
    {{!< layout}}
    ...
    {{#contentFor 'style'}}<script src="script.js"></script>{{/contentFor}}
    ```

## [0.0.5] - 2020-6-5

* Add face collection page to sample

## [0.0.4] - 2020-6-5

* It is now possible to define multiple section blocks in a subview that inherits layoutView.

    File views/layout/default.hbs

    ```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      {{{block "style"}}}
    </head>
    <body>

      {{{body}}}

      {{{block "script"}}}
    </body>
    </html>
    ```

    File views/index.hbs

    ```html
    {{!< default}}
    {{#contentFor 'style'}}<link rel="stylesheet" href="/style.css">{{/contentFor}}
    {{#contentFor 'script'}}<script src="script.js"></script>{{/contentFor}}
    <h1>{{title}}</h1>
    ```

* Add Web pack to public

## [0.0.2] - 2020-6-5

* Changed to automatically map URL and router module.

## [0.0.1] - 2020-6-5

* Development version added.