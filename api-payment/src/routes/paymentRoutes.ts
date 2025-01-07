import { Router } from 'express';
import { handlePayment } from '../controllers/paymentController';
import { authorize } from '../middlewares/rbacMiddleware';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.post('/process', authMiddleware, authorize, handlePayment);

export default router;