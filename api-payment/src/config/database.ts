import { Sequelize } from 'sequelize';

console.log('./src/database.sqlite')
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './src/database.sqlite',
});

export default sequelize;