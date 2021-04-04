"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// import Handlebars from 'handlebars';
/**
 * JSON encoding.
 *
 * @example
 * {{{json value}}}
 */
function json(value, replacer = undefined, space = undefined) {
    return JSON.stringify(value, replacer, space);
}
/**
 * Replace specified content.
 *
 * @example
 * {{replace 'The quick brown fox jumps over the lazy dog. If the dog reacted, was it really lazy?' 'dog' 'monkey'}}
 */
function replace(str, find, replace) {
    return str.replace(find, replace);
}
/**
 * Returns the Assets path containing the file update time parameter.
 *
 * @example
 * {{cache_busting '/assets/style.css' '//example.com'}}
 * //example.com/assets/style.css?
 */
function cache_busting(assetsPath, baseUrl) {
    const publicPath = path_1.default.join(process.cwd(), 'public');
    const realPath = `${publicPath}/${assetsPath.replace(/^\//, '')}`;
    // const realPath = `${global.APP_ROOT}/public/${assetsPath.replace(/^\//, '')}`;
    if (!fs_1.default.existsSync(realPath))
        return assetsPath;
    const mtime = (new Date(fs_1.default.statSync(realPath).mtime)).getTime();
    return `${baseUrl}/${assetsPath.replace(/^\//, '')}?${mtime}`;
}
/**
 * Enable Handlebars template engine.
 */
class default_1 {
    /**
     * Mount on application.
     */
    static mount(app) {
        const hbs = require('express-hbs');
        const viewsPath = path_1.default.join(process.cwd(), 'views');
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
        app.set('views', viewsPath);
    }
}
exports.default = default_1;
