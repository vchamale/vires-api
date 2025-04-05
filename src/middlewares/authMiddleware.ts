import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayloadCustom extends jwt.JwtPayload {
    userId: string
    tenantId: number
}

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded: JwtPayloadCustom = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET!) as JwtPayloadCustom;
        req.userId = decoded.userId;
        req.tenantId = decoded.tenantId;

        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

export default authMiddleware;
