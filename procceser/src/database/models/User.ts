import { DataTypes, Model } from 'sequelize';
import sequelize from '../index';

class User extends Model {
    public id!: number;
    public value!: string;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'User',
    }
);

export default User;