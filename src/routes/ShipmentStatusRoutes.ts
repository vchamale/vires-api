import express from 'express';
import ShipmentStatusController from '../controllers/ShipmentStatusController';
import authMiddleware from '../middlewares/authMiddleware';
import roleMiddleware from '../middlewares/roleMiddleware';

const router = express.Router();

router.post('/', authMiddleware, roleMiddleware('Admin'), ShipmentStatusController.create);
router.get('/:id', authMiddleware, ShipmentStatusController.getById);
router.put('/:id', authMiddleware, roleMiddleware('Admin'), ShipmentStatusController.update);
router.delete('/:id', authMiddleware, roleMiddleware('Admin'), ShipmentStatusController.delete);
router.get('/', authMiddleware, ShipmentStatusController.getAll);

export default router;
