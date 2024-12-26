import express from 'express';
import TruckModelController from '../controllers/truckModelController';
import authMiddleware from '../middlewares/authMiddleware';
import roleMiddleware from '../middlewares/roleMiddleware';
import modifyRequestMiddleware from '../middlewares/modifyRequestMiddleware';

const router = express.Router();

router.post('/', authMiddleware, TruckModelController.create);
router.get('/:id', TruckModelController.getById);
// router.put('/:id', authMiddleware, roleMiddleware('Admin'), TruckModelController.update);
router.put('/:id', authMiddleware, modifyRequestMiddleware({}), TruckModelController.update);
router.delete('/:id', authMiddleware, roleMiddleware('Admin'), TruckModelController.delete);
router.get('/', TruckModelController.getAll);

export default router;
