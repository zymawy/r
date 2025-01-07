import express from 'express';
import paymentRoutes from './routes/paymentRoutes';
import webhookRoutes from './routes/webhookRoutes';
import { errorHandler } from './middlewares/errorHandler';
import authRoutes from './routes/authRoutes';
import { rateLimitMiddleware } from './middlewares/rateLimitMiddleware';

declare global {
    namespace Express {
        interface Request {
            user?: {
                role: string;
                email: string;
            };
            action: string
        }
    }
}

const app = express();

app.use(express.json());
app.use(rateLimitMiddleware); // let's apply rate limiting globally

app.use('/api/auth', authRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/webhook', webhookRoutes);


app.use(errorHandler);

export default app;