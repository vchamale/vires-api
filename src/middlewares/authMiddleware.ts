import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization'];

    // if (!token) {
    //     return res.status(401).json({ message: 'Unauthorized' });
    // }

    try {
        // const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET!);
        // req.user = decoded.user;
        // req.tenantId = decoded.tenantId;
        (req as any).tenantId = 1;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

export default authMiddleware;
