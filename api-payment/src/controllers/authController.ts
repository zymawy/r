import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { log } from 'console';

const SECRET_KEY = 'somesupersecretpassword';

export const generateToken = async (req: Request, res: Response): Promise<void> => {
    const { email } = req.body;

    if (!email) {
        res.status(400).json({status: 400, message: 'Email is required' });
        return;
    }

    try {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            res.status(404).json({status: 404, message: 'User not found' });
            return;
        }

        const token = jwt.sign({ email: user.email, role: user.role }, SECRET_KEY, { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (err) {
        log(err)
        res.status(500).json({ status: 500, message: 'Internal Server Error' });
    }
};