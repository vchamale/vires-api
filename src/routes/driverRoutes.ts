import express from 'express';
import UserController from '../controllers/userController';
import authMiddleware from '../middlewares/authMiddleware';
import modifyRequestMiddleware from '../middlewares/modifyRequestMiddleware';

const router = express.Router();

router.get('/', authMiddleware, modifyRequestMiddleware({}), UserController.getAllUser);
router.get('/:id', authMiddleware, modifyRequestMiddleware({}), UserController.getUser);
router.put('/:id', authMiddleware, modifyRequestMiddleware({}), UserController.updateUser);
router.post('/', authMiddleware, modifyRequestMiddleware({}), UserController.register);

export default router;
