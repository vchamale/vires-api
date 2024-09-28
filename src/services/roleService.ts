import Role from '@models/Role';

class RoleService {
    async getAll() {
        return await Role.findAll();
    }
}

export default new RoleService();
