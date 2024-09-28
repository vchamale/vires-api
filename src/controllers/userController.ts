import { Request, Response } from 'express';
import UserService from '@services/userService';
import AuthService from '@services/authService';

class UserController {
    async register(req: Request, res: Response) {
        try {
            const newUser = await UserService.create(req.body);
            return res.status(201).json(newUser);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const tokenData = await AuthService.login(email, password);
            return res.status(200).json(tokenData);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

    async getUser(req: Request, res: Response) {
        try {
            const user = await UserService.getById(parseInt(req.params.id));
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

export default new UserController();