"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const database_1 = __importDefault(require("~/config/database"));
/**
 * DB module.
 */
exports.default = new class Database extends sequelize_1.default.Sequelize {
    /**
     * Instantiate sequelize with name of database, username and password.
     */
    constructor() {
        let env = process.env.NODE_ENV;
        if (!env)
            env = 'development';
        super(database_1.default[env]);
    }
    /**
     * Returns true if the DB can be connected.
     */
    async isConnect() {
        try {
            await this.authenticate();
            return true;
        }
        catch {
            return false;
        }
    }
}();
