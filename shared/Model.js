import database from '../shared/Database';
import Reflect from '../shared/Reflect';

export default class {
  constructor(table, attributes) {
    const Model = database.define(table, attributes, {
      freezeTableName: true,
      timestamps: false
    });
    for (let method of Reflect.getStaticMethods(Model)) {
      if (method.indexOf('_') === 0) continue;
      this[method] = (...args) => Model[method].apply(Model, args);
    }
  }
}