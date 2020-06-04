import Model from '../shared/Model';
import { DataTypes } from 'sequelize';

export default class extends Model {
  constructor() {
    const table = 'user';
    const attributes = {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      name: DataTypes.STRING,
      created: DataTypes.DATE,
      modified: DataTypes.DATE
    };
    super(table, attributes);
  }
}