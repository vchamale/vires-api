import { Router } from 'express';
import currencyController from '../controllers/currencyController';

const router = Router();

router.get('/', currencyController.getAllCurrencies);
router.get('/:id', currencyController.getCurrencyById);
router.post('/', currencyController.createCurrency);
router.put('/:id', currencyController.updateCurrency);
router.delete('/:id', currencyController.deleteCurrency);

export default router;
