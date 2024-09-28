import { Request, Response } from 'express';
import RoleService from '../services/roleService';

class RoleController {
    async getAllRoles(req: Request, res: Response) {
        try {
            const roles = await RoleService.getAll();
            return res.status(200).json(roles);
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }
}

export default new RoleController();
