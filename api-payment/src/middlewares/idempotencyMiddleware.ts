import { Request, Response, NextFunction } from 'express';
import { LockService } from '../services/lockService';

const lockService = new LockService();

export const idempotencyMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const idempotencyKey = req.headers['x-idempotence-key'] as string;

    if (!idempotencyKey) {
         res.status(400).json({ message: 'Missing x-idempotence-key header' });
    }

    try {
        // let's if the idempotency key exists
        const cachedResponse = await lockService.checkIdempotencyKey(idempotencyKey);

        if (cachedResponse) {
             res.status(409).json({
                message: 'Duplicate request detected',
                data: JSON.parse(cachedResponse),
            });
            return;
        }

        // let's Attach the idempotency key to the request for later use
        req.headers['x-idempotence-key'] = idempotencyKey;

        next();
    } catch (error) {
        console.error('Redis error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
        return;
    }
};