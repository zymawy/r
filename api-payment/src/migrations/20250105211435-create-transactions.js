'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
      try {
        await queryInterface.createTable('transactions', {
          id: {
              type: Sequelize.DataTypes.INTEGER,
              autoIncrement: true,
              primaryKey: true,
              allowNull: false,
          },
          chargeId: {
              type: Sequelize.DataTypes.STRING,
              allowNull: false,
          },
          amount: {
              type: Sequelize.DataTypes.FLOAT,
              allowNull: false,
          },
          createdAt: {
              type: Sequelize.DataTypes.DATE,
              allowNull: false,
              defaultValue: Sequelize.DataTypes.NOW,
          },
          updatedAt: {
              type: Sequelize.DataTypes.DATE,
              allowNull: false,
              defaultValue: Sequelize.DataTypes.NOW,
          },
      });
    } catch (error) {
      console.error('Seeding error:', error);
    }
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('transactions');
    },
};