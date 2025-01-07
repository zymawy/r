import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Transaction extends Model {
    public id!: number;
    public chargeId!: string;
    public amount!: number;
}

Transaction.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        chargeId: {
            type: DataTypes.STRING,
            allowNull: false, // `NOT NULL` constraint
        },
        amount: {
            type: DataTypes.FLOAT,
            allowNull: false, // `NOT NULL` constraint
            validate: {
                isFloat: true,
            },
        },
    },
    {
        sequelize,
        modelName: 'Transaction',
        tableName: 'transactions',
        timestamps: true,
    }
);

export default Transaction;