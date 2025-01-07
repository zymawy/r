'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    try {
    await queryInterface.bulkInsert('transactions', [
      {
          chargeId: 'ch_1N23fJK8Dh9f3cEJhzbqa123',
          amount: 100.5,
          createdAt: new Date(),
          updatedAt: new Date(),
      },
      {
          chargeId: 'ch_1N23fJK8Dh9f3cEJhzbqa456',
          amount: 200.0,
          createdAt: new Date(),
          updatedAt: new Date(),
      },
    ]);
  } catch (error) {
    console.error('Seeding error:', error);
  }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('transactions', {});
  }
};
