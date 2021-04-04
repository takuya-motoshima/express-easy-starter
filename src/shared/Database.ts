import sequelize from 'sequelize';
import config from '~/config/database';

/**
 * DB module.
 */
export default new class Database extends sequelize.Sequelize {
  /**
   * Instantiate sequelize with name of database, username and password.
   */
  constructor() {
    let env = process.env.NODE_ENV as string;
    if (!env) env = 'development';
    super(config[env as keyof typeof config] as sequelize.Options);
  }

  /**
   * Returns true if the DB can be connected.
   */
  async isConnect(): Promise<boolean> {
    try {
      await this.authenticate();
      return true;
    } catch {
      return false;
    }
  }
}()