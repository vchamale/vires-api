import express from 'express';
import TruckModelController from '../controllers/truckModelController';
import authMiddleware from '../middlewares/authMiddleware';
import roleMiddleware from '../middlewares/roleMiddleware';
import modifyRequestMiddleware from '../middlewares/modifyRequestMiddleware';

const router = express.Router();

router.post('/', authMiddleware, modifyRequestMiddleware({}), TruckModelController.create);
router.get('/:id', authMiddleware, modifyRequestMiddleware({}), TruckModelController.getById);
// router.put('/:id', authMiddleware, roleMiddleware('Admin'), TruckModelController.update);
router.put('/:id', authMiddleware, modifyRequestMiddleware({}), TruckModelController.update);
router.delete('/:id', authMiddleware, modifyRequestMiddleware({}), roleMiddleware('Admin'), TruckModelController.delete);
router.get('/', authMiddleware, modifyRequestMiddleware({}), TruckModelController.getAll);

export default router;
