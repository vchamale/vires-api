import { Router } from 'express';
import containerController from '../controllers/containerController';

const router = Router();

router.get('/', containerController.getAllContainers);
router.get('/:id', containerController.getContainerById);
router.post('/', containerController.createContainer);
router.put('/:id', containerController.updateContainer);
router.delete('/:id', containerController.deleteContainer);

export default router;
