import express from 'express';
import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import session from 'express-session';
import Model from '../database/Model';

/**
 * Incorporate user authentication into your application.
 */
export default class {
  /**
   * Mount on application.
   */
  static mount(app, options) {
    // Set session save method.
    app.use(session({
      secret: 'secret',
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 24 * 3600000 // 24hours
      }
    }));

    // Use passport-local to set up local authentication with username and password.
    passport.use(new LocalStrategy({
      usernameField: options.username,
      passwordField: options.password,
      session: true
    }, async (username, password, done) => {
      const user = await options.model.findOne({where: {[options.username]: username, [options.password]: password}, raw: true});
      done(null, user||false);
    }));

    // Serialize the user information (ID in this case) and embed it in the session.
    passport.serializeUser((user, done) => done(null, user.id||undefined));

    // When the request is received, the user data corresponding to the ID is acquired and stored in req.user.
    passport.deserializeUser(async (id, done) => {
      const user = await options.model.findOne({where: {id}, raw: true});
      if (user) delete user[options.password];
      done(null, user);
    });

    // Initialize Passport.
    app.use(passport.initialize());

    // Authenticate access with session.
    // It also manages req.user, reads the session id from the client cookie, and "deserializes" to the user information based on it.
    app.use(passport.session());

    // Check the authentication status of the request.
    app.use((req, res, next) => {
      // Check if the request URL does not require authentication
      if (options.exclude && options.exclude.length) {
        const requestUrl = req.path.replace(/\/$/, '');
        if (options.exclude.indexOf(requestUrl) !== -1)
          return void next();
      }

      const isAjax = req.xhr;
      if (req.isAuthenticated()) {
        if (req.path !== options.failureRedirect||isAjax) {
          // Make user information available as a template variable when a view is requested.
          res.locals.session = req.user;
          next();
        } else res.redirect(options.successRedirect);
      } else {
        if (req.path === options.failureRedirect||isAjax)
          next();
        else
          res.redirect(options.failureRedirect);
      }
    });
  }

  /**
   * Sign in user.
   */
  signin(req, res, next) {
    return new Promise((resolve, reject) => {
      passport.authenticate('local', (error, user) => {
        if (error)
          return void reject(error);
        if (!user)
          return void resolve(false);
        req.logIn(user, error => {
          if (error)
            return void reject(error);
          resolve(true);
        });
      })(req, res, next);
    });
  }

  /**
   * Sign out the user.
   */
  signout(req, res, next) {
    req.logout();
  }
}
