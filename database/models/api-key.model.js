const DB = require('../');
const Sequelize = require('sequelize');

/**
 * This model describes apiKey table properties.
 */
const ApiKeyModel = DB.instance.define(
  'apiKeys',
  {
    uuid: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    userUuid: {
      type: Sequelize.UUID,
      notNull: true,
    },
    apiKey: Sequelize.STRING,
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  },
  {
    timestamps: true,
    tableName: 'apiKeys',
  }
);

ApiKeyModel.removeAttribute('id');

module.exports = ApiKeyModel;
