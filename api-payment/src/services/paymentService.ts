import stripe from 'stripe';
import sequelize from '../config/database';
import Transaction from '../models/Transaction';
import { log } from 'console';

const stripeClient = new stripe('sk_test_4eC39HqLyjWDarjtT1zdp7dc', { apiVersion: '2024-12-18.acacia' }); // process.env.STRIPE_API_KEY

export const processPayment = async (payload: { amount: number; token: string }): Promise<{ success: boolean; chargeId: string }> => {
    const transaction = await sequelize.transaction();

    try {
        const { amount, token } = payload;

        const charge = await stripeClient.charges.create({
            amount,
            currency: 'usd',
            source: token,
        },
        { idempotencyKey: `payment-${token}-${Date.now()}` }); // let's supported ,since stripe already support idempotency 

        await Transaction.create({ chargeId: charge.id, amount }, { transaction });

        await transaction.commit();

        return { success: true, chargeId: charge.id };
    } catch (error) {
        log(error)
        await transaction.rollback();
        throw new Error('Payment failed');
    }
};