import sequelize from 'sequelize';
import database from '~/shared/Database';

/**
 * Model base class.
 */
export default class Model extends sequelize.Model {
  /**
   * Reference table name.
   * @type {string}
   */
  protected static table: string;

  /**
   * Reference column list.
   * @type {sequelize.ModelAttributes}
   */
  protected static attributes: sequelize.ModelAttributes;

  /**
   * Data type of the column.
   * @type {any}
   */
  public static type: any = sequelize.DataTypes;

  /**
   * Attach a model to your application to make it available.
   * 
   * @return {Model}
   */
  public static attach(): any {
    this.init(this.attributes, {
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
  protected static association(): void {
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
  public static async begin(): Promise<sequelize.Transaction> {
    return database.transaction();
}

  // /**
  //  * Returns data that matches the ID.
  //  * 
  //  * @param  {number}          id
  //  * @return {Promise<{}|null>}
  //  */
  // static async findById(id: number): Promise<any> {
  //   return super.findOne({where: {id}, raw: true});
  // }
}