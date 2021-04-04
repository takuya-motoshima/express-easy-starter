"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const Model_1 = __importDefault(require("~/shared/Model"));
exports.default = (_a = class UserModel extends Model_1.default {
        static async isPasswordCorrect(id, password) {
            return await this.count({ where: { id, password } }) > 0;
        }
    },
    /**
     * Reference table name.
     * @type {string}
     */
    _a.table = 'user',
    /**
     * Reference column list.
     * @type {sequelize.ModelAttributes}
     */
    _a.attributes = {
        id: {
            type: Model_1.default.type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email: Model_1.default.type.STRING,
        password: Model_1.default.type.STRING,
        name: Model_1.default.type.STRING,
        created: Model_1.default.type.DATE,
        modified: Model_1.default.type.DATE
    },
    _a).attach();
