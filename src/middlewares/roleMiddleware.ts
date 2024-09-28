import { Request, Response, NextFunction } from 'express';
import User from '../models/User';
import Role from '../models/Role';

const roleMiddleware = (requiredRole: string) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Obtener el usuario junto con el rol
        // const user = await User.findByPk(req.user.userId, { include: [Role] });

        // if (!user || user.Role?.name !== requiredRole) {
        //     return res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
        // }

        next();
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export default roleMiddleware;