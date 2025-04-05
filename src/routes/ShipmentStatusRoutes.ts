import express from 'express';
import ShipmentStatusController from '../controllers/ShipmentStatusController';
import authMiddleware from '../middlewares/authMiddleware';
import roleMiddleware from '../middlewares/roleMiddleware';
import modifyRequestMiddleware from '../middlewares/modifyRequestMiddleware';

const router = express.Router();

router.post('/', authMiddleware, modifyRequestMiddleware({}), roleMiddleware('Admin'), ShipmentStatusController.create);
router.get('/:id', authMiddleware, modifyRequestMiddleware({}), ShipmentStatusController.getById);
router.put('/:id', authMiddleware, modifyRequestMiddleware({}), roleMiddleware('Admin'), ShipmentStatusController.update);
router.delete('/:id', authMiddleware, modifyRequestMiddleware({}), roleMiddleware('Admin'), ShipmentStatusController.delete);
router.get('/', authMiddleware, modifyRequestMiddleware({}), ShipmentStatusController.getAll);

export default router;
