import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

/** @todo move it to .env */
const SECRET_KEY = 'somesupersecretpassword'; 

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        res.status(401).json({
              status: 401,
             message: 'Unauthorized' 
            });
        return;
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded as { role: string; email: string };

        next();
    } catch (err) {
        res.status(401).json({
            status: 401,
             message: 'Invalid token' 
        });
    }
};