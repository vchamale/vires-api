import { Router } from 'express';
import originController from '../controllers/originController';

const router = Router();

router.get('/', originController.getAllOrigins);
router.get('/:id', originController.getOriginById);
router.post('/', originController.createOrigin);
router.put('/:id', originController.updateOrigin);
router.delete('/:id', originController.deleteOrigin);

export default router;
