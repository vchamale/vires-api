import express from 'express';
import UserController from '../controllers/userController';

const router = express.Router();

router.get('/', UserController.getAllUser);
router.get('/:id', UserController.getUser);

export default router;
