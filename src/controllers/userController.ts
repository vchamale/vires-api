import { Request, Response } from 'express';
import UserService from '../services/userService';
import AuthService from '../services/authService';

class UserController {
    async register(req: Request, res: Response) {
        try {
            const { tenantId } = req.body;
            if (!tenantId) {
                return res.status(400).json({ message: 'Tenant ID is required' });
            }
            const newUser = await UserService.create(req.body);
            return res.status(201).json(newUser);
        } catch (error: any) {
            return res.status(400).json({ message: error.message });
        }
    }

    async updateUser(req: Request, res: Response) {
        try {
            const { tenantId } = req.body;
            if (!tenantId) {
                return res.status(400).json({ message: 'Tenant ID is required' });
            }
            const updatedUser = await UserService.updateUser(+req.params.id, req.body);
            res.status(200).json(updatedUser);
        } catch (error: any) {
            if (error.message === 'User not found') {
                res.status(404).json({ message: error.message });
            } else {
                res.status(500).json({ message: error.message });
            }
        }
    }

    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const response = await AuthService.login(email, password);
            
            res.cookie('refreshToken', response.refreshToken, {
                httpOnly: true,    // No accesible desde JS
                secure: process.env.NODE_ENV === 'production',  // Solo HTTPS en producción
                sameSite: 'strict',  // Prevenir ataques CSRF
                path: '/',  // Disponible para toda la aplicación
                maxAge: 7 * 24 * 60 * 60 * 1000,  // 7 días
            });

            return res.status(200).json(response);
        } catch (error: any) {
            return res.status(400).json({ message: error.message });
        }
    }

    async refreshToken(req: Request, res: Response) {
        try {
            const refreshToken = req.cookies.refreshToken;  // Obtener el token desde la cookie
    
            if (!refreshToken) {
                return res.status(400).json({ message: 'Refresh token is required' });
            }
    
            const accessToken = await AuthService.refreshToken(refreshToken);
    
            return res.json({ accessToken });
        } catch (error: any) {
            return res.status(401).json({ message: error.message });
        }
    }

    async changePassword(req: Request, res: Response) {
        try {
            const { email, password, newPassword } = req.body;
            console.log(email, password, newPassword)
            const user = await AuthService.changePassword(email, password, newPassword);
            console.log('tokenData ', user)
            return res.status(200).json(user);
        } catch (error: any) {
            return res.status(400).json({ message: error.message });
        }
    }

    async getUser(req: Request, res: Response) {
        try {
            const { tenantId } = req.query;
            if (!tenantId) {
                return res.status(400).json({ message: 'Tenant ID is required' });
            }
            const user = await UserService.getById(+req.params.id, +tenantId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            return res.status(200).json(user);
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }

    async getAllUser(req: Request, res: Response) {
        try {
            const { tenantId } = req.query;
            if (!tenantId) {
                return res.status(400).json({ message: 'Tenant ID is required' });
            }
            const users = await UserService.getAll(+tenantId);
            return res.status(200).json(users);
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }
}

export default new UserController();