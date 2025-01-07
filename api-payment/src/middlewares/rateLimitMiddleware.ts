import { Request, Response, NextFunction } from 'express';
import { RateLimitService } from '../services/rateLimitService';
import { log } from 'console';

const rateLimitService = new RateLimitService(
    parseInt(process.env.RATE_LIMIT_WINDOW || '60', 10), // here we can configure the time window based on our need for exemple if we have some poratiy based on the user subscaption
    parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '10', 10) // here as well :)
); 

export const rateLimitMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const clientIp = req.ip as string; // let get the client IP for limiting the requerts 

    try {
        if (await rateLimitService.isRateLimited(clientIp)) {
            const remainingTime = await rateLimitService.getRemainingRequests(clientIp);
             res.status(429).json({
                message: 'Too Many Requests',
                remainingTime,
            });
            return;
        }

        next();
    } catch (error) {
        console.error('Rate limiting error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};