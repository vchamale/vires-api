import { Request, Response } from 'express';
import RoleService from '../services/roleService';
import { Op, col, fn, where } from 'sequelize';

class RoleController {
    async getAllRoles(req: Request, res: Response) {
        try {
            const { tenantId } = req.query;
            if (!tenantId) {
                return res.status(400).json({ message: 'Tenant ID is required' });
            }
            const filters: any = {};
            filters[Op.or] = [
                where(fn('LOWER', col('name')), {
                    [Op.notLike]: `%${('SUPER' as string).toLowerCase()}%`,
                }),
            ];
            const roles = await RoleService.getAll(filters);
            return res.status(200).json(roles);
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }
}

export default new RoleController();
