const DB = require('../');
const Sequelize = require('sequelize');

/**
 * This model describes notes table properties.
 */
const NoteModel = DB.instance.define(
  'notes',
  {
    uuid: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    userUuid: {
      type: Sequelize.UUID,
      notNull: true
    },
    title: Sequelize.STRING,
    content: Sequelize.STRING,
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
  },
  {
    timestamps: true
  }
);

NoteModel.removeAttribute('id');

module.exports = NoteModel;
