import { Router } from 'express';
import OriginController from '../controllers/originController';
import authMiddleware from '../middlewares/authMiddleware';
import modifyRequestMiddleware from '../middlewares/modifyRequestMiddleware';

const router = Router();

router.get('/', authMiddleware, modifyRequestMiddleware({}), OriginController.getAllOrigins);
router.get('/:id', authMiddleware, modifyRequestMiddleware({}), OriginController.getOriginById);
// router.post('/', OriginController.createOrigin);
router.post('/', authMiddleware, modifyRequestMiddleware({}), OriginController.createOrigin);
router.put('/:id', authMiddleware, modifyRequestMiddleware({}), OriginController.updateOrigin);
router.delete('/:id', authMiddleware, modifyRequestMiddleware({}), OriginController.deleteOrigin);

router.get(
  '/client/:clientId',
  authMiddleware,
  modifyRequestMiddleware({}),
  OriginController.getOriginsByClientId
);

export default router;
