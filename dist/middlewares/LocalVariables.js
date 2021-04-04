"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Set local variables.
 * It can be accessed in all views as {{var}} or {{{var}}}.
 *
 * Below is a description of the variables.
 * baseUrl: The base URL for this application.
 */
class default_1 {
    /**
     * Mount on application.
     */
    static mount(app, options) {
        // Initialize options.
        options = Object.assign({ override: undefined }, options);
        app.use((req, res, next) => {
            // Generate baseUrl based on request header.
            let baseUrl;
            if (req.headers.referer)
                baseUrl = new URL(req.headers.referer).origin;
            else
                baseUrl = 'x-forwarded-proto' in req.headers ? `${req.headers['x-forwarded-proto']}://${req.headers.host}` : `//${req.headers.host}`;
            if (options && options.override)
                baseUrl = options.override(baseUrl);
            // Set baseUrl to a local variable.
            app.locals.baseUrl = baseUrl;
            next();
        });
    }
}
exports.default = default_1;
