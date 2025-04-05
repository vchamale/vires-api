import express from 'express';
import MakeController from '../controllers/makeController';
import authMiddleware from '../middlewares/authMiddleware';
import roleMiddleware from '../middlewares/roleMiddleware';
import modifyRequestMiddleware from '../middlewares/modifyRequestMiddleware';

const router = express.Router();

router.post('/', authMiddleware, modifyRequestMiddleware({}), MakeController.create);
router.get('/:id', authMiddleware, modifyRequestMiddleware({}), MakeController.getById);
router.get('/:makeId/model', authMiddleware, modifyRequestMiddleware({}), MakeController.getModelsByMakeId);
// router.put('/:id', authMiddleware, roleMiddleware('Admin'), MakeController.update);
router.put('/:id', authMiddleware, modifyRequestMiddleware({}), MakeController.update);
// router.delete('/:id', authMiddleware, roleMiddleware('Admin'), MakeController.delete);
router.delete('/:id', authMiddleware, modifyRequestMiddleware({}), MakeController.delete);
router.get('/', authMiddleware, MakeController.getAll);

export default router;
