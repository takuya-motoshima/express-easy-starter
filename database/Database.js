import sequelize from 'sequelize';
import database from '../config/database';

/**
 * Connect to DB.
 */
export default new class extends sequelize.Sequelize {
  /**
   * Create a sequelize instance.
   */
  constructor() {
    const env = process.env.NODE_ENV||'development';
    const options = database[env];
    super(options.database, options.username, options.password||undefined, options);
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