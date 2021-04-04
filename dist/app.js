"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("~/config/config"));
const EnvironmentVariables_1 = __importDefault(require("~/middlewares/EnvironmentVariables"));
const TemplateEngine_1 = __importDefault(require("~/middlewares/TemplateEngine"));
const Http_1 = __importDefault(require("~/middlewares/Http"));
const CORS_1 = __importDefault(require("~/middlewares/CORS"));
const LocalVariables_1 = __importDefault(require("~/middlewares/LocalVariables"));
const UserAuthentication_1 = __importDefault(require("~/authentication/UserAuthentication"));
const Router_1 = __importDefault(require("~/routing/Router"));
const GlobalVariables_1 = __importDefault(require("~/middlewares/GlobalVariables"));
const UserModel_1 = __importDefault(require("~/models/UserModel"));
// Creates and configures an ExpressJS web server.
const app = express_1.default();
// Set environment variables.
EnvironmentVariables_1.default.mount({ path: config_1.default.envPath });
// Enable Handlebars template engine.
if (config_1.default.enableView)
    TemplateEngine_1.default.mount(app);
// Defines all the requisites in HTTP.
Http_1.default.mount(app, { maxBodySize: config_1.default.maxBodySize });
// Enables the CORS.
if (config_1.default.enableCors)
    CORS_1.default.mount(app);
// Set local variables.
LocalVariables_1.default.mount(app, { override: config_1.default.overrideBaseUrl });
// Incorporate user authentication into your application.
if (config_1.default.userAuthentication && config_1.default.userAuthentication.enabled)
    UserAuthentication_1.default.mount(app, { ...config_1.default.userAuthentication, model: UserModel_1.default });
// Set up URL routing.
Router_1.default.mount(app, { defaultController: config_1.default.defaultController });
// Set global variables.
GlobalVariables_1.default.mount();
exports.default = app;
