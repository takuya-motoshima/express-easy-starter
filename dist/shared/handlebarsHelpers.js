"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cache_busting = exports.replace = exports.json = void 0;
const fs_1 = __importDefault(require("fs"));
/**
 * JSON encoding.
 *
 * @example
 * {{{json value}}}
 */
function json(value, replacer = undefined, space = undefined) {
    return JSON.stringify(value, replacer, space);
}
exports.json = json;
/**
 * Replace specified content.
 *
 * @example
 * {{replace 'The quick brown fox jumps over the lazy dog. If the dog reacted, was it really lazy?' 'dog' 'monkey'}}
 */
function replace(str, find, replace) {
    return str.replace(find, replace);
}
exports.replace = replace;
/**
 * Returns the Assets path containing the file update time parameter.
 *
 * @example
 * {{cache_busting '/assets/style.css' '//example.com'}}
 * //example.com/assets/style.css?
 */
function cache_busting(assetsPath, baseUrl) {
    const realPath = `${global.APP_ROOT}/public/${assetsPath.replace(/^\//, '')}`;
    if (!fs_1.default.existsSync(realPath))
        return assetsPath;
    const mtime = (new Date(fs_1.default.statSync(realPath).mtime)).getTime();
    return `${baseUrl}/${assetsPath.replace(/^\//, '')}?${mtime}`;
}
exports.cache_busting = cache_busting;
