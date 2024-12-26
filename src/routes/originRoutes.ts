import { Router } from 'express';
import OriginController from '../controllers/originController';
import authMiddleware from '../middlewares/authMiddleware';
import modifyRequestMiddleware from '../middlewares/modifyRequestMiddleware';

const router = Router();

router.get('/', OriginController.getAllOrigins);
router.get('/:id', OriginController.getOriginById);
// router.post('/', OriginController.createOrigin);
router.post('/', authMiddleware, modifyRequestMiddleware({}), OriginController.createOrigin);
router.put('/:id', authMiddleware, modifyRequestMiddleware({}), OriginController.updateOrigin);
router.delete('/:id', OriginController.deleteOrigin);

export default router;
