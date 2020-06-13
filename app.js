import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import dotenv from 'dotenv';
import fs from 'fs';
import hbs from 'express-hbs';
import config from './config/config';
import File from './shared/File';
import Reflect from './shared/Reflect';
import UserSignin from './shared/UserSignin';

const app = express();

// Load environment variables
if (config.envPath) {
  const env = dotenv.parse(fs.readFileSync(config.envPath))
  for (let key in env) {
    process.env[key] = env[key]
  }
}

// view engine setup
app.engine('hbs', hbs.express4({
  partialsDir: path.join(__dirname, 'views//partials'),
  layoutsDir: path.join(__dirname, 'views/layout'),
  defaultLayout: path.join(__dirname, 'views/layout/default.hbs')
}));
app.set('view engine', 'hbs');
app.set('views',  path.join(__dirname, 'views'));
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'hbs');

app.use(logger('dev'));

app.use(express.json({ extended: true, limit: config.maxRequestBodySize || '100kb'}));
app.use(express.urlencoded({ extended: true, limit: config.maxRequestBodySize || '100kb'}));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Allow CORS
if (config.CORS) {
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    // res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Credentials', true);
    req.requestedUrl = req.path;
    next();
  });
}

// User authentication
if (config.userSignin.enabled) {
  const userSignin = new UserSignin();
  userSignin.attach(app, config.userSignin);
}

// URL routing
for (let path of File.glob(`${__dirname}/routes/**/*.js`)) {
  const { default: router } = require(path);
  const [ _, directory, file ] = path.match(/\/routes(?:(\/..*))?\/(..*)\.js/);
  const url = directory ? `${directory}/${file.toLowerCase()}` : `/${file.toLowerCase()}`;
  console.log(`URL: ${url}`);
  app.use(url === config.defaultController ? '/' : url, router);
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;