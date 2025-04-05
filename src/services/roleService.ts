import Role from '../models/Role';

class RoleService {
    async getAll(filters: any) {
        return await Role.findAll({ where: filters });
    }
}

export default new RoleService();
