import { Router } from 'express';
import containerController from '../controllers/containerController';
import authMiddleware from '../middlewares/authMiddleware';
import modifyRequestMiddleware from '../middlewares/modifyRequestMiddleware';

const router = Router();

router.get('/', authMiddleware, modifyRequestMiddleware({}), containerController.getAllContainers);
router.get('/:id', authMiddleware, modifyRequestMiddleware({}), containerController.getContainerById);
router.post('/', authMiddleware, modifyRequestMiddleware({}), containerController.createContainer);
router.put('/:id', authMiddleware, modifyRequestMiddleware({}), containerController.updateContainer);
router.delete('/:id', authMiddleware, modifyRequestMiddleware({}), containerController.deleteContainer);

export default router;
