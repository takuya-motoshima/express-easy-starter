import express from 'express';
import multer from 'multer';
import cookieParser from 'cookie-parser';
// TODO: If you import morgan here, "GMT morgan deprecated" will occur, so morgan is used by require.
// import morgan from 'morgan';
import path from 'path';

/**
 * Http Optional Interface.
 */
interface HttpOptions {
  maxBodySize?: string;
}

/**
 * Defines all the requisites in HTTP.
 */
export default class {
  /**
   * Mount on application.
   */
  public static mount(app: express.Express, options?: HttpOptions): void {
    // Initialize options.
    options = Object.assign({maxBodySize: '100kb'}, options);

    // Log HTTP request.
    const morgan = require('morgan')
    app.use(morgan('dev'));

    // For parsing application/json.
    app.use(express.json({limit: options.maxBodySize}));

    // For parsing application/x-www-form-urlencoded.
    app.use(express.urlencoded({extended: true, limit: options.maxBodySize}));

    // For parsing multipart/form-data.
    const upload = multer();
    app.use(upload.array('files')); 

    // For parsing Cookie.
    app.use(cookieParser());

    // Static file path.
    app.use(express.static(path.join(process.cwd(), 'public')));
  }
}