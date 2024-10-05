import { Router } from 'express';
import truckController from '../controllers/truckController';

const router = Router();

router.get('/', truckController.getAllTrucks);
router.get('/:id', truckController.getTruckById);
router.post('/', truckController.createTruck);
router.put('/:id', truckController.updateTruck);
router.delete('/:id', truckController.deleteTruck);

export default router;
