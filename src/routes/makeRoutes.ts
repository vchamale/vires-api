import express from 'express';
import MakeController from '../controllers/makeController';
import authMiddleware from '../middlewares/authMiddleware';
import roleMiddleware from '../middlewares/roleMiddleware';

const router = express.Router();

router.post('/', authMiddleware, MakeController.create);
router.get('/:id', MakeController.getById);
router.get('/:makeId/model', MakeController.getModelsByMakeId);
// router.put('/:id', authMiddleware, roleMiddleware('Admin'), MakeController.update);
router.put('/:id', authMiddleware, MakeController.update);
// router.delete('/:id', authMiddleware, roleMiddleware('Admin'), MakeController.delete);
router.delete('/:id', authMiddleware, MakeController.delete);
router.get('/', MakeController.getAll);

export default router;
