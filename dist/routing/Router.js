"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const nodejs_shared_1 = require("nodejs-shared");
const path_1 = __importDefault(require("path"));
/**
 * Set up URL routing.
 *
 * Define URL routing based on the path of the file in the routes directory.
 * For example, if you have "routes/api/users.js", you can request the method in "user.js (ts)" with the base URL as "https:////api/users".
 */
class default_1 {
    /**
     * Mount on application.
     */
    static mount(app, options) {
        // Initialize options.
        options = Object.assign({ defaultController: undefined }, options);
        // Set the URL to route based on the path of the file in the routes directory.
        const routesPath = path_1.default.join(process.cwd(), 'routes');
        for (let filepath of nodejs_shared_1.File.find(`${routesPath}/**/*.js`)) {
            const { default: router } = require(filepath);
            const matches = filepath.match(/\/routes(?:(\/..*))?\/(..*)\.js/);
            if (!matches)
                continue;
            const [_, dir, filename] = matches;
            const url = dir ? `${dir}/${filename.toLowerCase()}` : `/${filename.toLowerCase()}`;
            app.use(url === options.defaultController ? '/' : url, router);
        }
        // Catch 404 and forward to error handler.
        app.use((req, res, next) => {
            next(http_errors_1.default(404));
        });
        // Error handler.
        app.use((err, req, res, next) => {
            // Set locals, only providing error in development.
            if (req.xhr) {
                res.status(err.status || 500);
                res.json({ error: err.message });
            }
            else {
                // Set error information in a local variable.This is available in the view.
                res.locals.message = err.message;
                res.locals.error = req.app.get('env') === 'development' ? err : {};
                // Render the error page.
                res.status(err.status || 500);
                res.render('error');
            }
        });
    }
}
exports.default = default_1;
