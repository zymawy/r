"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlePayment = void 0;
const paymentService_1 = require("../services/paymentService");
const handlePayment = async (req, res, next) => {
    try {
        const result = await (0, paymentService_1.processPayment)(req.body);
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
};
exports.handlePayment = handlePayment;
