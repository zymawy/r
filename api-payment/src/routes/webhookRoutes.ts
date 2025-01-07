import express from 'express';
import { webhook } from '../controllers/webhookController';
import { idempotencyMiddleware } from '../middlewares/idempotencyMiddleware';

const router = express.Router();

router.post('/', idempotencyMiddleware, webhook);

export default router;