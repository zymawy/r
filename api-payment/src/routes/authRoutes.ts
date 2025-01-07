import express from 'express';
import { generateToken } from '../controllers/authController';

const router = express.Router();

// just for the sake for the simplicty 
// we will generate a token based on the 
// email that is exists in our db... 
router.post('/token', generateToken);

export default router;