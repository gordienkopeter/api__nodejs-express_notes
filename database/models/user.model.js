const DB = require('../');
const Sequelize = require('sequelize');
const NoteModel = require('./note.model');
const TokenModel = require('./token.model');
const ApiKeyModel = require('./api-key.model');

/**
 * This model describes users table properties.
 */
const UserModel = DB.instance.define(
  'users',
  {
    uuid: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    email: {
      type: Sequelize.STRING,
      isEmail: true,
      notNull: true,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
      notNull: true,
    },
    firstName: {
      type: Sequelize.STRING,
      notNull: true,
    },
    lastName: {
      type: Sequelize.STRING,
      notNull: true,
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  },
  {
    timestamps: true,
    tableName: 'users',
  }
);

UserModel.removeAttribute('id');

/**
 * Describes users <=> notes relationship
 */
UserModel.hasMany(NoteModel);
NoteModel.belongsTo(UserModel);

/**
 * Describes users <=> tokens relationship
 */
UserModel.hasOne(TokenModel);
TokenModel.belongsTo(UserModel);

/**
 * Describes users <=> api_keys relationship
 */
UserModel.hasOne(ApiKeyModel);
ApiKeyModel.belongsTo(UserModel);

module.exports = UserModel;
