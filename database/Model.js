import sequelize from 'sequelize';
import database from '../database/Database';

/**
 * Model base class.
 */
export default class Model extends sequelize.Model {

  /**
   * Column type.
   */
  static get types() {
    return sequelize.DataTypes;
  }

  /**
   * Mount on application.
   */
  static mount() {
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
   * @see https://sequelize.org/master/manual/assocs.html
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
   * @see https://sequelize.org/master/manual/transactions.html
   */
  static async begin() {
    return database.transaction();
  }

  /**
   * Returns data that matches the ID.
   */
  static async findById(id) {
    return super.findOne({where: {id}, raw: true});
  }
}