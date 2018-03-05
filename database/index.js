const Sequelize = require('sequelize');
const DBConfig = require('../config/database.config');

require('dotenv').config();

/**
 * This class describes connecting in database.
 */
class Database {
  constructor() {
    this.connect(DBConfig);
  }

  /**
   * This property returns default database config.
   */
  get defaultOptions() {
    return {
      logging: true
    };
  }

  /**
   * This method connects in database.
   *
   * @param {*} options
   */
  connect(options) {
    if (typeof options === 'string') {
      return (this.instance = new Sequelize(options, this.defaultOptions));
    }

    return (this.instance = new Sequelize({ ...this.defaultOptions, ...options }));
  }
}

module.exports = new Database();
