import express from 'express';
import ShipmentController from '../controllers/shipmentController';
import authMiddleware from '../middlewares/authMiddleware';
import roleMiddleware from '../middlewares/roleMiddleware';
import modifyRequestMiddleware from '../middlewares/modifyRequestMiddleware';

const router = express.Router();

// router.post('/', authMiddleware, roleMiddleware('Admin'), ShipmentController.create);
router.post('/', ShipmentController.create);
router.get('/:id', authMiddleware, ShipmentController.getById);
// router.put('/:id', authMiddleware, roleMiddleware('Admin'), ShipmentController.update);
router.put('/:id', authMiddleware, modifyRequestMiddleware({}), ShipmentController.update);
router.delete('/:id', authMiddleware, roleMiddleware('Admin'), ShipmentController.delete);
// router.get('/', authMiddleware, ShipmentController.getAll);
router.get('/', authMiddleware, modifyRequestMiddleware({}), ShipmentController.getAll);

export default router;
