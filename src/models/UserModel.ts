import sequelize from 'sequelize';
import Model from '~/shared/Model';

export default (class UserModel extends Model {
  /**
   * Reference table name.
   * @type {string}
   */
  protected static table: string = 'user';

  /**
   * Reference column list.
   * @type {sequelize.ModelAttributes}
   */
  protected static attributes: sequelize.ModelAttributes = {
    id: {
      type: Model.type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    email: Model.type.STRING,
    password: Model.type.STRING,
    name: Model.type.STRING,
    created: Model.type.DATE,
    modified: Model.type.DATE
  }

  public static async isPasswordCorrect(id: number, password: string): Promise<boolean> {
    return await this.count({where: {id, password}}) > 0;
  }
}).attach();