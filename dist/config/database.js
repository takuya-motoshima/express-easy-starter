"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * DB option.
 */
exports.default = {
    development: {
        dialect: 'mariadb',
        database: 'sample',
        username: 'root',
        host: 'localhost',
        timezone: 'Etc/GMT-9'
    },
    test: {
        dialect: 'mariadb',
        database: 'sample',
        username: 'root',
        host: 'localhost',
        timezone: 'Etc/GMT-9'
    },
    production: {
        dialect: 'mariadb',
        database: 'sample',
        username: 'root',
        host: 'localhost',
        timezone: 'Etc/GMT-9'
    }
};
