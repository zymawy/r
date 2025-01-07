"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize({
    dialect: 'sqlite',
    storage: './data/database.sqlite',
});
(async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
    }
    catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();
exports.default = sequelize;
