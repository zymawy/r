import { Request, Response } from 'express';
import Transaction from '../models/Transaction';
import { log } from 'console';
import { LockService } from '../services/lockService';


const lockService = new LockService();

export const webhook = async (req: Request, res: Response): Promise<void>  => {
    const { type, data } = req.body;
    
    const idempotencyKey = req.headers['x-idempotence-key'] as string;

    // let's Acquire lock for the idempotency
    const lock = await lockService.acquireLock(idempotencyKey);

    if (! lock) {
         res.status(409).json({ status: 409, message: 'Duplicate request detected' });
         return;
    }


    if (! data.chargeId) {
        res.status(400).json({ status: 400,  message: 'chargeId is required' });
        return;
    }

    if (! data.chargeId) {
        res.status(400).json({ status: 400, message: 'chargeId is required' });
        return;
    }

    try {
    

        switch (type) {
            case 'charge.succeeded': {

                const transaction = await Transaction.create({
                    chargeId: data.chargeId,
                    amount: data.amount,
                    createdAt: Date.now(),
                    updatedAt: Date.now(),
                });

            
                const response = { success: true, chargeId: data.chargeId };

                // let get going and lock the requreest to avoid conacroncy aka (idempotency)
                await lockService.saveIdempotencyKey(idempotencyKey, response);

                 res.status(200).json(response);
                 return;
            }
            default:
                log(`Unhandled event type: ${type}`);
                 res.status(400).json({ message: 'Unhandled event type' });
                 return;
        }
    } catch (error) {
        console.error('Webhook error:', error);
         res.status(500).json({ message: 'Internal Server Error' });
         return;
    } finally {
        // Release the lock
        if (lock) {
            await lockService.releaseLock(lock);
        }
    }
};