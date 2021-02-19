import express from 'express'
import createError from 'http-errors';
import path from 'path';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import dotenv from 'dotenv';
import fs from 'fs';
import config from './config/config';
import Authenticator from './shared/Authenticator';
import Routing from './shared/Routing'

// Creates and configures an ExpressJS web server.
class App {

  /**
   * Run configuration methods on the Express instance.
   */
  constructor() {
    this.app = express();
    this.config();
    this.templateEngine();
    this.middleware();
    this.cors();
    this.userAuthentication();
    this.routing();
  }

  /**
   * Load environment variables
   */
  config() {
    if (!config.env) return;
    const env = dotenv.parse(fs.readFileSync(config.env))
    for (let key in env) {
      process.env[key] = env[key]
    }
  }

  /**
   * Configure the template engine
   */
  templateEngine() {
    if (!config.useView) return;
    const hbs = require('express-hbs');
    this.app.engine('hbs', hbs.express4({
      partialsDir: path.join(process.cwd(), 'views//partials'),
      layoutsDir: path.join(process.cwd(), 'views/layout'),
      defaultLayout: path.join(process.cwd(), 'views/layout/default.hbs')
    }));
    this.app.set('view engine', 'hbs');
    this.app.set('views',  path.join(process.cwd(), 'views'));
  }

  /**
   * Configure Express middleware.
   */
  middleware() {
    // Set HTTP request logging
    this.app.use(morgan('dev'));
    // For parsing application/json
    this.app.use(express.json({ limit: config.maxRequestBodySize || '100kb'}));
    // For parsing application/x-www-form-urlencoded
    this.app.use(express.urlencoded({ extended: true, limit: config.maxRequestBodySize || '100kb'}));
    // For parsing Cookie
    this.app.use(cookieParser());
    // Attach static file path
    this.app.use(express.static(path.join(process.cwd(), 'public')));
  }

  /**
   * Configure CORS
   */
  cors() {
    if (!config.CORS) return;
    // Allow CORS
    this.app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', req.headers.origin);
      res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
      res.header('Access-Control-Allow-Credentials', 'true');
      next();
    });
  }

  /**
   * Configure user authentication
   */
  userAuthentication() {
    if (!config.authentication || !config.authentication.enabled) return;
    const authenticator = new Authenticator();
    authenticator.attach(this.app, config.authentication);
  }

  /**
   * Configure API endpoints.
   */
  routing() {
    // Automatic routing
    Routing.attach(this.app, `${__dirname}/routes`);

    // catch 404 and forward to error handler
    this.app.use((req, res, next) => {
      next(createError(404));
    });

    // error handler
    this.app.use((err, req, res, next) => {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};
      // render the error page
      res.status(err.status || 500);
      res.render('error');
    });
  }
}

export default new App().app;