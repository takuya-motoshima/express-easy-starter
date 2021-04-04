"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodejs_shared_1 = require("nodejs-shared");
const config_1 = __importDefault(require("~/config/config"));
/**
 * URL routing module.
 */
class default_1 {
    /**
     * Generate URL routing from controller class metadata
     */
    static attach(app, routerDir) {
        const routerFiles = nodejs_shared_1.File.find(`${routerDir}/**/*.js`);
        for (let routerFile of routerFiles) {
            const { default: router } = require(routerFile);
            const matches = routerFile.match(/\/routes(?:(\/..*))?\/(..*)\.js/);
            if (!matches)
                continue;
            const [_, dir, file] = matches;
            const url = dir ? `${dir}/${file.toLowerCase()}` : `/${file.toLowerCase()}`;
            app.use(url === config_1.default.defaultController ? '/' : url, router);
        }
    }
}
exports.default = default_1;
