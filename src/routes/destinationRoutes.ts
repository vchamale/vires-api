import { Router } from 'express';
import destinationController from '../controllers/destinationController';
import authMiddleware from '../middlewares/authMiddleware';
import modifyRequestMiddleware from '../middlewares/modifyRequestMiddleware';

const router = Router();

router.get('/', authMiddleware, modifyRequestMiddleware({}), destinationController.getAllDestinations);
router.get('/:id', authMiddleware, modifyRequestMiddleware({}), destinationController.getDestinationById);
router.post('/', authMiddleware, modifyRequestMiddleware({}), destinationController.createDestination);
router.put('/:id', authMiddleware, modifyRequestMiddleware({}), destinationController.updateDestination);
router.delete('/:id', authMiddleware, modifyRequestMiddleware({}), destinationController.deleteDestination);

export default router;