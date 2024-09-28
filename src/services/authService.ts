import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '@models/User';

class AuthService {
    async login(email: string, password: string) {
        const user = await User.findOne({ where: { email } });
        if (!user || !bcrypt.compareSync(password, user.password)) {
            throw new Error('Invalid credentials');
        }

        const token = jwt.sign({ userId: user.user_id, roleId: user.role_id }, process.env.JWT_SECRET!, {
            expiresIn: '1h'
        });
        return { user, token };
    }
}

export default new AuthService();
