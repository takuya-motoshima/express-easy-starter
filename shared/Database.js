import Sequelize from 'sequelize';
import database from '../config/database';

class Database extends Sequelize {
  constructor() {
    const config = database[process.env.NODE_ENV || 'development'];
    super(config.database, config.username, config.password, config);
  }

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