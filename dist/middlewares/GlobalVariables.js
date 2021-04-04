"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Set global variables.
 * It can be accessed like "global.xxx" in all router and model classes.
 *
 * Below is a description of the variables.
 * APP_ROOT: The directory where app.js is located.
 */
class default_1 {
    /**
     * Mount on application.
     */
    static mount() {
        // Application root path.
        global.APP_ROOT = process.cwd();
        // global.APP_ROOT = path.resolve(__dirname);
    }
}
exports.default = default_1;
