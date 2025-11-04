import bcrypt from 'bcryptjs';
import User from '../models/User';
import Tenant from '../models/Tenant';
import Truck from '../models/Truck';

class UserService {
    async create(userData: any) {
        const hashedPassword = bcrypt.hashSync('userData.password', 10);
        const newUser = await User.create({ ...userData, password: hashedPassword });
        return newUser;
    }

    async updateUser(id: number, userData: Partial<{
        tenantId: number;
        roleId: number;
        truckId?: number;
        email: string;
        names: string;
        lastNames: string;
        telephone: string;
        license: string;
        status: boolean;
    }>) {
        const user = await User.findByPk(id);
        if (!user) {
            throw new Error('User not found');
        }
        return await user.update(userData);
    }

    async getById(userId: number, tenantId: number) {
        return await User.findOne({ 
            where: {
                userId,
                tenantId
            },
            attributes: { exclude: ['password'] },
            include: [
            { model: Tenant, as: 'tenant' },
            { model: Truck, as: 'truck' }
        ] });
    }

    async getAll(tenantId: number) {
        return await User.findAll({ 
            where: {
                tenantId,
                roleId: 3
            },
            attributes: { exclude: ['password'] },
            include: [
            { model: Tenant, as: 'tenant' },
            { model: Truck, as: 'truck' }
        ] });
    }

    async getAllDrivers(tenantId: number) {
        return await User.findAll({ 
            where: {
                tenantId,
                roleId: 3
            },
            attributes: { exclude: ['password'] },
            include: [
            { model: Tenant, as: 'tenant' },
            { model: Truck, as: 'truck' }
        ] });
    }
}

export default new UserService();