import Sequelize from 'sequelize';
import database from '../config/database';

class Database extends Sequelize {
  constructor() {
    const config = database[process.env.NODE_ENV || 'development'];
    super(config.database, config.username, config.password, config);
  }
}
export default new Database();