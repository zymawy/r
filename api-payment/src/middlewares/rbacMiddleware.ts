import { Request, Response, NextFunction } from 'express';
import { hasPermission } from '../utils/helpers';
import { log } from 'console';

export const authorize = (req: Request, res: Response, next: NextFunction): void => {
    const userRole = req.user?.role;
    const action = req.action || 'payment';

    if (!userRole || !hasPermission(userRole, action)) {
        res.status(403).json({
            status: 403,
            message: `Access denied you dont have the right to make this ${action} action`
        });
        return;
    }

    next();
};