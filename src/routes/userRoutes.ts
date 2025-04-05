import express from 'express';
import UserController from '../controllers/userController';
import authMiddleware from '../middlewares/authMiddleware';
import modifyRequestMiddleware from '../middlewares/modifyRequestMiddleware';

const router = express.Router();

router.post('/register', authMiddleware, modifyRequestMiddleware({}), UserController.register);
router.post('/login', UserController.login);
router.post('/refresh-token', UserController.refreshToken);
router.put('/change-password', UserController.changePassword);
// router.get('/:id', authMiddleware, UserController.getUser);
router.get('/:id', authMiddleware, modifyRequestMiddleware({}), UserController.getUser);

export default router;
