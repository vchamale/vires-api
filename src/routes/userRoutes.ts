import express from 'express';
import UserController from '../controllers/userController';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/register', UserController.register);
router.post('/login', UserController.login);
// router.get('/:id', authMiddleware, UserController.getUser);
router.get('/:id', UserController.getUser);

export default router;
