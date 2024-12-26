import express from 'express';
import DocumentController from '../controllers/documentController';
import authMiddleware from '../middlewares/authMiddleware';
import roleMiddleware from '../middlewares/roleMiddleware';

const router = express.Router();

// router.post('/', DocumentController.create);
router.post('/', authMiddleware, DocumentController.create);
// router.post('/', authMiddleware, roleMiddleware('Admin'), DocumentController.create);
router.get('/:id', DocumentController.getById);
// router.get('/:id', authMiddleware, DocumentController.getById);
router.put('/:id', DocumentController.update);
// router.put('/:id', authMiddleware, roleMiddleware('Admin'), DocumentController.update);
router.delete('/:id', authMiddleware, roleMiddleware('Admin'), DocumentController.delete);
// router.get('/', authMiddleware, DocumentController.getAll);
router.get('/', DocumentController.getAll);

export default router;
