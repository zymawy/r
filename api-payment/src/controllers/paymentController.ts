import { Request, Response, NextFunction } from 'express';
import { processPayment } from '../services/paymentService';

export const handlePayment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const result = await processPayment(req.body);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};