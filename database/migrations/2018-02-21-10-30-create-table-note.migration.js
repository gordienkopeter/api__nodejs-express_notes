/**
 * This migration describes create notes table.
 */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .createTable('notes', {
        uuid: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true
        },
        userUuid: {
          type: Sequelize.UUID,
          defaultValue: false,
          allowNull: false
        },
        content: {
          type: Sequelize.STRING,
          defaultValue: false,
          allowNull: false
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
      })
      .then(() => queryInterface.addIndex('notes', { fields: ['userUuid'] }));
  },
  down: (queryInterface, Sequelize) => queryInterface.dropTable('notes')
};
