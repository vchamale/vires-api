import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';

class AuthService {
    async login(email: string, password: string) {
        const user = await User.findOne({ where: { email: email.toLowerCase() } });
        if (!user || !bcrypt.compareSync(password, user.password as string)) {
            throw new Error('Invalid credentials');
        }

        if (!user) {
            throw new Error('Invalid credentials');
        }

        const [name] = user.names?.split(' ') ?? [''];
        const [lastname] = user.lastNames?.split(' ') ?? [''];

        const accessToken = jwt.sign({ userId: user.userId, roleId: user.roleId, tenantId: user.tenantId, name: `${name} ${lastname}` }, process.env.JWT_SECRET!, {
            expiresIn: '20s'
        });

        const refreshToken = jwt.sign(
            { userId: user.userId, tenantId: user.tenantId },
            process.env.JWT_REFRESH_SECRET!,
            { expiresIn: '7d' }
        );
        
        return { accessToken, refreshToken };
    }

    async refreshToken(oldRefreshToken: string) {
        try {
            const payload = jwt.verify(oldRefreshToken, process.env.JWT_REFRESH_SECRET!);
    
            const user = await User.findOne({ where: { userId: (payload as any).userId } });
            if (!user) {
                throw new Error('Invalid refresh token');
            }
    
            const newAccessToken = jwt.sign(
                { userId: user.userId, roleId: user.roleId, tenantId: user.tenantId },
                process.env.JWT_SECRET!,
                { expiresIn: '1h' }
            );
    
            return { accessToken: newAccessToken };
        } catch (error) {
            throw new Error('Invalid or expired refresh token');
        }
    }

    async changePassword(email: string, password: string, newPassword: string) {
        const user = await User.findOne({ where: { email: email.toLowerCase() } });
        if (!user) {
            //  || !bcrypt.compareSync(password, user.password as string)) {
            throw new Error('Invalid credentials');
        }

        const hashedPassword = bcrypt.hashSync(newPassword, 10);
        const newUser = await user.update({ ...user, password: hashedPassword });
        return newUser
    }
}

export default new AuthService();
