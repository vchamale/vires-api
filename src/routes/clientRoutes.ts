import express from 'express';
import ClientController from '../controllers/clientController';
import authMiddleware from '../middlewares/authMiddleware';
import roleMiddleware from '../middlewares/roleMiddleware';
import modifyRequestMiddleware from '../middlewares/modifyRequestMiddleware';

const router = express.Router();

router.post('/', authMiddleware, modifyRequestMiddleware({}), roleMiddleware('Admin'), ClientController.createClient);
// router.get('/:id', authMiddleware, ClientController.getClient);
router.get('/:id', authMiddleware, modifyRequestMiddleware({}), ClientController.getClient);
router.get('/', authMiddleware, modifyRequestMiddleware({}), ClientController.getAllClients);
router.put('/:id', authMiddleware, modifyRequestMiddleware({}), roleMiddleware('Admin'), ClientController.updateClient);
router.delete('/:id', authMiddleware, modifyRequestMiddleware({}), roleMiddleware('Admin'), ClientController.deleteClient);

export default router;
