'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('users', [
            { email: 'admin@example.com', role: 'admin', createdAt: new Date(), updatedAt: new Date() },
            { email: 'user@example.com', role: 'user', createdAt: new Date(), updatedAt: new Date() },
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('users', null, {});
    },
};