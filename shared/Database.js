import Sequelize from 'sequelize';
import database from '../config/database';

/**
 * DB module.
 */
class Database extends Sequelize {
  /**
   * Instantiate sequelize with name of database, username and password.
   */
  constructor() {
    const config = database[process.env.NODE_ENV || 'development'];
    super(config.database, config.username, config.password, config);
  }

  /**
   * Returns true if the DB can be connected.
   */
  async isConnect() {
    try {
      await this.authenticate();
      return true;
    } catch {
      return false;
    }
  }
}
export default new Database();