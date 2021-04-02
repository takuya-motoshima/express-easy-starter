import express from 'express'
import createError from 'http-errors';
import path from 'path';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import fs from 'fs';
import config from './config/config';
import hook from './config/hook';
import Routing from './shared/Routing';
import Authenticator from './shared/Authenticator';
// import Handlebars from 'handlebars';
// TODO: If you import morgan here, "GMT morgan deprecated" will occur, so morgan is used by require.
// import morgan from 'morgan';
import * as hbsHelpers from './shared/handlebarsHelpers';

/**
 * Set environment variables.
 */
function setEnvironmentVariables() {
  if (!config.env) return;
  const env = dotenv.parse(fs.readFileSync(config.env))
  for (let key in env) {
    process.env[key] = env[key]
  }
}

/**
 * Set template engine.
 */
function setTemplateEngine(app) {
  if (!config.useView) return;
  const hbs = require('express-hbs');
  const viewPath = `${__dirname}/views`;

  // Added helper function to template engine.
  hbs.registerHelper('json', hbsHelpers.json);
  hbs.registerHelper('replace', hbsHelpers.replace);
  hbs.registerHelper('cache_busting', hbsHelpers.cache_busting);

  // Apply template engine to your app.
  app.engine('hbs', hbs.express4({
    partialsDir: `${viewPath}/partials`,
    layoutsDir: `${viewPath}/layout`,
    defaultLayout: `${viewPath}/layout/default.hbs`,
    // handlebars: Handlebars
    // extname: '.html'
  }));
  app.set('view engine', 'hbs');
  app.set('views',  viewPath);
}

/**
 * Set basic request behavior.
 */
function setBasicRequestBehavior(app) {
  // Set HTTP request logging
  const morgan = require('morgan')
  app.use(morgan('dev'));

  // For parsing application/json
  app.use(express.json({
    limit: config.maxRequestBodySize || '100kb'
  }));

  // For parsing application/x-www-form-urlencoded
  app.use(express.urlencoded({
    extended: true,
    limit: config.maxRequestBodySize || '100kb'
  }));

  // For parsing Cookie
  app.use(cookieParser());

  // Attach static file path
  app.use(express.static(path.join(process.cwd(), 'public')));
}

/**
 * Set CORS permissions.
 */
function setCorsPermissions(app) {
  if (!config.cors) return;
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
  });
}

/**
 * Set up URL routing.
 */
function setupUrlRouting(app) {
  // Automatic routing
  Routing.attach(app, `${__dirname}/routes`);

  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    next(createError(404));
  });

  // error handler
  app.use((err, req, res, next) => {
    // set locals, only providing error in development
    if (req.xhr) {
      res.status(err.status || 500);
      res.json({ error: err.message });
    } else {
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};
      // render the error page
      res.status(err.status || 500);
      res.render('error');
    }
  });
}

/**
 * Set global variables.
 * It can be accessed like "global.xxx" in all router and model classes.
 *
 * Below is a description of the variables.
 * APP_ROOT: The directory where app.js is located.
 */
function setGlobalVariables() {
  // Application root path.
  global.APP_ROOT = path.resolve(__dirname);
}

/**
 * Set local variables.
 * It can be accessed in all views as {{xxx}} or {{{xxx}}}.
 * 
 * Below is a description of the variables.
 * baseUrl: The base URL for this application.
 */
function setLocalVariables(app) {
  app.use((req, res, next) => {
    let baseUrl;
    if (req.headers.referer) {
      const url = new URL(req.headers.referer);
      baseUrl = url.origin;
    } else {
      baseUrl = 'x-forwarded-proto' in req.headers ? `${req.headers['x-forwarded-proto']}:` : '';
      baseUrl += `//${req.headers.host}`;
    }
    if (hook.extendBaseUrl) baseUrl = hook.extendBaseUrl(baseUrl);
    app.locals.baseUrl = baseUrl;
    next();
  });
}

/**
 * Set user authentication.
 */
function setUserAuthentication(app) {
  if (!config.authentication || !config.authentication.enabled) return;
  const authenticator = new Authenticator();
  authenticator.attach(app, config.authentication);
}

// Creates and configures an ExpressJS web server.
const app = express();

// Load environment variables
setEnvironmentVariables();

// Initialize View engine.
setTemplateEngine(app);

// Initialize middleware.
setBasicRequestBehavior(app);

// Set CORS.
setCorsPermissions(app);

// Set local variables.
setLocalVariables(app);

// Configure user authentication.
setUserAuthentication(app);

// Set routing.
setupUrlRouting(app);

// Set global variables.
setGlobalVariables();

export default app;