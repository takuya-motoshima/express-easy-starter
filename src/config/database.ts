import {Options} from 'sequelize';

/**
 * DB option interface.
 */
interface DatabaseOptions {
  [key: string]: Options;
}

/**
 * DB option.
 */
export default {
  development: {
    dialect: 'mariadb',
    database: 'sample',
    username: 'root',
    host: 'localhost',
    timezone: 'Etc/GMT-9'
  },
  test: {
    dialect: 'mariadb',
    database: 'sample',
    username: 'root',
    host: 'localhost',
    timezone: 'Etc/GMT-9'
  },
  production: {
    dialect: 'mariadb',
    database: 'sample',
    username: 'root',
    host: 'localhost',
    timezone: 'Etc/GMT-9'
  }
}
