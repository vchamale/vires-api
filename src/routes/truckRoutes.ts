import { Router } from 'express';
import truckController from '../controllers/truckController';
import authMiddleware from '../middlewares/authMiddleware';
import modifyRequestMiddleware from '../middlewares/modifyRequestMiddleware';

const router = Router();

router.get('/', authMiddleware, modifyRequestMiddleware({}), truckController.getAllTrucks);
router.get('/:id', truckController.getTruckById);
router.post('/', truckController.createTruck);
router.put('/:id', authMiddleware, modifyRequestMiddleware({}), truckController.updateTruck);
router.delete('/:id', truckController.deleteTruck);

export default router;
