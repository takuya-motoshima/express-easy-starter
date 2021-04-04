import express from 'express';
import fs from 'fs';
import path from 'path';
// import Handlebars from 'handlebars';

/**
 * JSON encoding.
 *
 * @example
 * {{{json value}}}
 */
function json(value: {}|[], replacer: string[]|number[]|undefined = undefined, space: string|undefined = undefined): string {
  return JSON.stringify(value, replacer, space);
}

/**
 * Replace specified content.
 *
 * @example
 * {{replace 'The quick brown fox jumps over the lazy dog. If the dog reacted, was it really lazy?' 'dog' 'monkey'}}
 */
function replace(str: string, find: string, replace: string): string {
  return str.replace(find, replace);
}

/**
 * Returns the Assets path containing the file update time parameter.
 *
 * @example
 * {{cache_busting '/assets/style.css' '//example.com'}}
 * //example.com/assets/style.css?
 */
function cache_busting(assetsPath: string, baseUrl: string): string {
  const publicPath = path.join(process.cwd(), 'public');
  const realPath = `${publicPath}/${assetsPath.replace(/^\//, '')}`;
  // const realPath = `${global.APP_ROOT}/public/${assetsPath.replace(/^\//, '')}`;
  if (!fs.existsSync(realPath)) return assetsPath;
  const mtime = (new Date(fs.statSync(realPath).mtime)).getTime();
  return `${baseUrl}/${assetsPath.replace(/^\//, '')}?${mtime}`;
}

/**
 * Enable Handlebars template engine.
 */
export default class {
  /**
   * Mount on application.
   */
  public static mount(app: express.Express): void {
    const hbs = require('express-hbs');
    const viewsPath = path.join(process.cwd(), 'views');

    // Added helper function to template engine.
    hbs.registerHelper('json', json);
    hbs.registerHelper('replace', replace);
    hbs.registerHelper('cache_busting', cache_busting);

    // Apply template engine to your app.
    app.engine('hbs', hbs.express4({
      partialsDir: `${viewsPath}/partials`,
      layoutsDir: `${viewsPath}/layout`,
      defaultLayout: `${viewsPath}/layout/default.hbs`,
      // handlebars: Handlebars
      // extname: '.html'
    }));
    app.set('view engine', 'hbs');
    app.set('views',  viewsPath);
  }
}