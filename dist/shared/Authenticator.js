"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const express_session_1 = __importDefault(require("express-session"));
const UserModel_1 = __importDefault(require("~/models/UserModel"));
class default_1 {
    attach(app, options = {}) {
        options = Object.assign({
            usernameField: 'username',
            passwordField: 'password',
            loginSuccessfulUrl: '/',
            loginFailureUrl: '/login',
            exclude: []
        }, options);
        app.use(express_session_1.default({
            secret: 'secret',
            resave: false,
            saveUninitialized: false,
            cookie: {
                secure: false,
                httpOnly: false,
                maxAge: 24 * 3600000 // 24hours
            }
        }));
        passport_1.default.use(new passport_local_1.Strategy({
            usernameField: options.usernameField,
            passwordField: options.passwordField,
            session: true
        }, async (username, password, done) => {
            const where = {};
            where[options.usernameField] = username;
            where[options.passwordField] = password;
            const user = await UserModel_1.default.findOne({ where, raw: true });
            done(null, user || false);
        }));
        passport_1.default.serializeUser((user, done) => {
            done(null, user.id);
        });
        passport_1.default.deserializeUser(async (id, done) => {
            const user = await UserModel_1.default.findByPk(id, { raw: true });
            delete user[options.passwordField];
            done(null, user);
        });
        app.use(passport_1.default.initialize());
        app.use(passport_1.default.session());
        app.use((req, res, next) => {
            // Check if the request URL does not require authentication
            if (options.exclude && options.exclude.length) {
                const requestUrl = req.path.replace(/\/$/, '');
                if (options.exclude.indexOf(requestUrl) !== -1)
                    return void next();
            }
            const isAjax = req.xhr;
            if (req.isAuthenticated()) {
                if (req.path !== options.loginFailureUrl || isAjax) {
                    // Make user information available as a template variable when a view is requested.
                    res.locals.session = req.user;
                    next();
                }
                else
                    res.redirect(options.loginSuccessfulUrl);
            }
            else {
                if (req.path === options.loginFailureUrl || isAjax)
                    next();
                else
                    res.redirect(options.loginFailureUrl);
            }
        });
    }
    signin(req, res, next) {
        return new Promise((resolve, reject) => {
            passport_1.default.authenticate('local', (error, user) => {
                if (error)
                    return void reject(error);
                if (!user)
                    return void resolve(false);
                req.logIn(user, error => {
                    if (error)
                        return void reject(error);
                    resolve(true);
                });
            })(req, res, next);
        });
    }
    signout(req, res, next) {
        req.logout();
    }
}
exports.default = default_1;
