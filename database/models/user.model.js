const DB = require('../');
const Sequelize = require('sequelize');
const NoteModel = require('./note.model');
const TokenModel = require('./token.model');

/**
 * This model describes users table properties.
 */
const UserModel = DB.instance.define(
  'users',
  {
    uuid: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    email: {
      type: Sequelize.STRING,
      isEmail: true,
      notNull: true,
      unique: true
    },
    password: {
      type: Sequelize.STRING,
      notNull: true
    },
    firstName: {
      type: Sequelize.STRING,
      notNull: true
    },
    lastName: {
      type: Sequelize.STRING,
      notNull: true
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
  },
  {
    timestamps: true,
    tableName: 'users'
  }
);

UserModel.removeAttribute('id');
// UserModel.hasMany(NoteModel);
UserModel.hasOne(TokenModel);

module.exports = UserModel;
