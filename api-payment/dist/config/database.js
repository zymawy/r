"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize('db_name', 'username', 'password', {
    host: 'localhost',
    dialect: 'postgres'
});
exports.default = sequelize;
