import { Sequelize, Model as SequelizeModel, DataTypes } from 'sequelize';
import database from '../shared/Database';

export default class extends SequelizeModel {

  static get DataTypes() {
    return DataTypes;
  }

  static attach() {
    console.log('this.table=', this.table);
    console.log('this.attributes=', this.attributes);
    super.init(this.attributes, {
      modelName: this.table, 
      sequelize: database,
      freezeTableName: true,
      timestamps: false,
    });
    return this;
  }
}
