import express from 'express';
import RoleController from '../controllers/roleController';
import authMiddleware from '../middlewares/authMiddleware';
import modifyRequestMiddleware from '../middlewares/modifyRequestMiddleware';

const router = express.Router();

// router.get('/', authMiddleware, roleMiddleware('Admin'), RoleController.getAllRoles);
router.get('/', authMiddleware, modifyRequestMiddleware({}), RoleController.getAllRoles);

export default router;
