"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
// TODO: If you import morgan here, "GMT morgan deprecated" will occur, so morgan is used by require.
// import morgan from 'morgan';
const path_1 = __importDefault(require("path"));
/**
 * Defines all the requisites in HTTP.
 */
class default_1 {
    /**
     * Mount on application.
     */
    static mount(app, options) {
        // Initialize options.
        options = Object.assign({ maxBodySize: '100kb' }, options);
        // Log HTTP request.
        const morgan = require('morgan');
        app.use(morgan('dev'));
        // For parsing application/json.
        app.use(express_1.default.json({ limit: options.maxBodySize }));
        // For parsing application/x-www-form-urlencoded.
        app.use(express_1.default.urlencoded({ extended: true, limit: options.maxBodySize }));
        // For parsing multipart/form-data.
        const upload = multer_1.default();
        app.use(upload.array('files'));
        // For parsing Cookie.
        app.use(cookie_parser_1.default());
        // Static file path.
        app.use(express_1.default.static(path_1.default.join(process.cwd(), 'public')));
    }
}
exports.default = default_1;
