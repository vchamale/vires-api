import express from 'express';
import DocumentController from '../controllers/documentController';
import authMiddleware from '../middlewares/authMiddleware';
import roleMiddleware from '../middlewares/roleMiddleware';
import modifyRequestMiddleware from '../middlewares/modifyRequestMiddleware';

const router = express.Router();

// router.post('/', DocumentController.create);
router.post('/', authMiddleware, modifyRequestMiddleware({}), DocumentController.create);
// router.post('/', authMiddleware, roleMiddleware('Admin'), DocumentController.create);
router.get('/:id', authMiddleware, modifyRequestMiddleware({}), DocumentController.getById);
// router.get('/:id', authMiddleware, DocumentController.getById);
router.put('/:id', authMiddleware, modifyRequestMiddleware({}), DocumentController.update);
// router.put('/:id', authMiddleware, roleMiddleware('Admin'), DocumentController.update);
router.delete('/:id', authMiddleware, modifyRequestMiddleware({}), roleMiddleware('Admin'), DocumentController.delete);
// router.get('/', authMiddleware, DocumentController.getAll);
router.get('/', authMiddleware, modifyRequestMiddleware({}), DocumentController.getAll);

export default router;
