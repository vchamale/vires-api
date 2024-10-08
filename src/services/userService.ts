import bcrypt from 'bcryptjs';
import User from '../models/User';

class UserService {
    async create(userData: any) {
        const hashedPassword = bcrypt.hashSync(userData.password, 10);
        const newUser = await User.create({ ...userData, password: hashedPassword });
        return newUser;
    }

    async getById(userId: number) {
        return await User.findByPk(userId, { attributes: { exclude: ['password'] } });
    }

    async getAll() {
        return await User.findAll({ attributes: { exclude: ['password'] } });
    }
}

export default new UserService();