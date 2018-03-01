/**
 * This migration describes create api keys table.
 */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .createTable('apiKeys', {
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
        apiKey: {
          type: Sequelize.STRING,
          defaultValue: false,
          allowNull: false,
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
      })
      .then(() =>
        queryInterface.addIndex('apiKeys', { fields: ['uuid', 'userUuid'] })
      );
  },
  down: (queryInterface, Sequelize) => queryInterface.dropTable('apiKeys'),
};
