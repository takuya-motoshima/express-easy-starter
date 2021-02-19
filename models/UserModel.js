import Model from '../shared/Model';

export default (class extends Model {

  static get table() {
    return 'user';
  }

  static get attributes() {
    const attributes = {
      id: {
        type: super.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      email: super.DataTypes.STRING,
      password: super.DataTypes.STRING,
      name: super.DataTypes.STRING,
      created: super.DataTypes.DATE,
      modified: super.DataTypes.DATE
    };
  }

  static async isPasswordCorrect(id, password) {
    const count = await super.count({ where: { id, password } });
    return count > 0;
  }
}).attach();