import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import session from 'express-session';
import UserModel from '../models/UserModel';
import express from 'express';

export default class {
  constructor() {
    this.userModel = new UserModel();
  }

  attach(app, options = {}) {
    options = Object.assign({
      usernameField: 'username',
      passwordField: 'password',
      successRedirect: '/',
      failureRedirect: '/login',
      unauthenticatedUrl: []
    }, options);
    app.use(session({
      secret: 'secret',
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: false,
        httpOnly: false,
        maxAge: 24 * 3600000 // 24hours
      }
    }));
    passport.use(new LocalStrategy({
      usernameField: options.usernameField,
      passwordField: options.passwordField,
      session: true
    }, async (username, password, done) => {
      const where = {};
      where[options.usernameField] = username;
      where[options.passwordField] = password;
      const user = await this.userModel.findOne({ where, raw: true });
      done(null, user || false);
    }));
    passport.serializeUser((user, done) => {
      done(null, user.id);
    });
    passport.deserializeUser(async (id, done) => {
      const user = await this.userModel.findByPk(id, { raw: true });
      delete user[options.passwordField];
      done(null, user);
    });
    app.use(passport.initialize());
    app.use(passport.session());
    app.use((req, res, next) => {

      // Check if the request URL does not require authentication
      if (options.unauthenticatedUrl && options.unauthenticatedUrl.length) {
        const requestUrl = req.path.replace(/\/$/, '');
        if (options.unauthenticatedUrl.indexOf(requestUrl) !== -1) {
          return void next();
        }
      }

      const isAjax = req.xhr;
      if (req.isAuthenticated()) {
        if (req.path !== options.failureRedirect || isAjax) {
          // Make user information available as a template variable when a view is requested.
          res.locals.session = req.user;
          next();
        } else {
          res.redirect(options.successRedirect);
        }
      } else {
        if (req.path === options.failureRedirect || isAjax) {
          next();
        } else {
          res.redirect(options.failureRedirect);
        }
      }
    });
  }

  signin(req, res, next) {
    return new Promise((resolve, reject) => {
      passport.authenticate('local', (error, user) => {
        if (error) return void reject(error);
        if (!user) return void resolve(false);
        req.logIn(user, error => {
          if (error) return void reject(error);
          resolve(true);
        });
      })(req, res, next);
    });
  }

  signout(req, res, next) {
    req.logout();
  }
}
