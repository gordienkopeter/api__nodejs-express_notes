const DB = require('../');
const Sequelize = require('sequelize');

/**
 * This model describes tokens table properties.
 */
const TokenModel = DB.instance.define(
  'tokens',
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
    token: Sequelize.STRING,
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  },
  {
    timestamps: true,
    tableName: 'tokens',
  }
);

TokenModel.removeAttribute('id');

module.exports = TokenModel;
