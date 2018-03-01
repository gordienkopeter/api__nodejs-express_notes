/**
 * This migration describes create tokens table.
 */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .createTable('tokens', {
        uuid: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
        },
        userUuid: {
          type: Sequelize.UUID,
          defaultValue: false,
          allowNull: false,
        },
        token: {
          type: Sequelize.STRING,
          defaultValue: false,
          allowNull: false,
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
      })
      .then(() =>
        queryInterface.addIndex('tokens', { fields: ['uuid', 'userUuid'] })
      );
  },
  down: (queryInterface, Sequelize) => queryInterface.dropTable('tokens'),
};
