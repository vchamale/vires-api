import express from 'express';
import ClientController from '@controllers/clientController';
import authMiddleware from '@middlewares/authMiddleware';
import roleMiddleware from '@middlewares/roleMiddleware';

const router = express.Router();

router.post('/', authMiddleware, roleMiddleware('Admin'), ClientController.createClient);
router.get('/:id', authMiddleware, ClientController.getClient);
router.put('/:id', authMiddleware, roleMiddleware('Admin'), ClientController.updateClient);
router.delete('/:id', authMiddleware, roleMiddleware('Admin'), ClientController.deleteClient);

export default router;
