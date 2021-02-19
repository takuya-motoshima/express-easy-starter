import { Sequelize, Model as SequelizeModel, DataTypes, transaction } from 'sequelize';
import database from '../shared/Database';

export default class Model extends SequelizeModel {

  /**
   * Returns the data type of the column.
   * 
   * @see https://sequelize.org/v5/manual/data-types.html
   */
  static get DataTypes() {
    return DataTypes;
  }

  /**
   * Attach a model to your application to make it available.
   * 
   * @return {Model}
   */
  static attach() {
    super.init(this.attributes, {
      modelName: this.table, 
      sequelize: database,
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
   * @return {Promise<Sequelize.Transaction>}
   */
  static async begin() {
    return database.transaction();
  }

  /**
   * Returns data that matches the ID.
   * 
   * @param  {number}          id
   * @return {Promise<Object>}
   */
  static async findById(id) {
    return super.findOne({
      where: { id },
      raw: true
    });
  }
}