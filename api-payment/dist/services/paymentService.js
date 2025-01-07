"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processPayment = void 0;
const stripe_1 = __importDefault(require("stripe"));
const database_1 = __importDefault(require("../config/database"));
const Transaction_1 = __importDefault(require("../models/Transaction"));
const stripeClient = new stripe_1.default('stripe-key', { apiVersion: '2024-12-18.acacia' }); // process.env.STRIPE_API_KEY
const processPayment = async (payload) => {
    const transaction = await database_1.default.transaction();
    try {
        const { amount, token } = payload;
        const charge = await stripeClient.charges.create({
            amount,
            currency: 'usd',
            source: token,
        });
        await Transaction_1.default.create({ chargeId: charge.id, amount }, { transaction });
        await transaction.commit();
        return { success: true, chargeId: charge.id };
    }
    catch (error) {
        await transaction.rollback();
        throw new Error('Payment failed');
    }
};
exports.processPayment = processPayment;
