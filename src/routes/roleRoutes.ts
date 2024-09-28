import express from 'express';
import RoleController from '@controllers/roleController';
import authMiddleware from '@middlewares/authMiddleware';
import roleMiddleware from '@middlewares/roleMiddleware';

const router = express.Router();

router.get('/', authMiddleware, roleMiddleware('Admin'), RoleController.getAllRoles);

export default router;
