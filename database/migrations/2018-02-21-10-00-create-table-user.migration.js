/**
 * This migration describes create users table.
 */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .createTable('users', {
        uuid: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true
        },
        email: {
          type: Sequelize.STRING,
          defaultValue: false,
          allowNull: false,
          unique: true
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false
        },
        firstName: {
          type: Sequelize.STRING,
          defaultValue: false,
          allowNull: false
        },
        lastName: {
          type: Sequelize.STRING,
          defaultValue: false,
          allowNull: false
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
      })
      .then(() => queryInterface.addIndex('users', { fields: ['email'] }));
  },
  down: (queryInterface, Sequelize) => queryInterface.dropTable('users')
};
