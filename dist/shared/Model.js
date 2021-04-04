"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const Database_1 = __importDefault(require("~/shared/Database"));
/**
 * Model base class.
 */
class Model extends sequelize_1.default.Model {
    /**
     * Attach a model to your application to make it available.
     *
     * @return {Model}
     */
    static attach() {
        this.init(this.attributes, {
            modelName: this.table,
            sequelize: Database_1.default,
            freezeTableName: true,
            timestamps: false,
        });
        this.association();
        return this;
    }
    /**
     * Define table associations.
     *
     * @see https://sequelize.org/master/manual/assocs.html
     * @return {void}
     */
    static association() {
        // Define association in subclass
    }
    /**
     * Start a transaction.
     *
     * @example
     * // First, we start a transaction and save it into a variable
     * const t = await SampleModel.begin();
     *
     * try {
     *   // Then, we do some calls passing this transaction as an option:
     *   const user = await SampleModel.create({ name: 'Bart' }, { transaction: t });
     *
     *   // If the execution reaches this line, no errors were thrown.
     *   // We commit the transaction.
     *   await t.commit();
     * } catch (error) {
     *   // If the execution reaches this line, an error was thrown.
     *   // We rollback the transaction.
     *   await t.rollback();
     * }
     *
     * @see https://sequelize.org/master/manual/transactions.html
     * @return {Promise<sequelize.Transaction>}
     */
    static async begin() {
        return Database_1.default.transaction();
    }
}
exports.default = Model;
/**
 * Data type of the column.
 * @type {any}
 */
Model.type = sequelize_1.default.DataTypes;
