import { Router } from 'express';
import currencyController from '../controllers/currencyController';
import authMiddleware from '../middlewares/authMiddleware';
import modifyRequestMiddleware from '../middlewares/modifyRequestMiddleware';

const router = Router();

router.get('/', authMiddleware, modifyRequestMiddleware({}), currencyController.getAllCurrencies);
router.get('/:id', authMiddleware, modifyRequestMiddleware({}), currencyController.getCurrencyById);
router.post('/', authMiddleware, modifyRequestMiddleware({}), currencyController.createCurrency);
router.put('/:id', authMiddleware, modifyRequestMiddleware({}), currencyController.updateCurrency);
router.delete('/:id', authMiddleware, modifyRequestMiddleware({}), currencyController.deleteCurrency);

export default router;
