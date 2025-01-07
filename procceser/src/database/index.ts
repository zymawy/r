import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './data/database.sqlite',
});

(async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync(); 
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();


export default sequelize;