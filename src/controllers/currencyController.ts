import { Request, Response } from 'express';
import currencyService from '../services/currencyService';
import { createLogger } from '../config/logger';

// Logger asociado a este módulo -> cada línea sale como [currencyController].
const log = createLogger('currencyController');

class CurrencyController {
    async getAllCurrencies(req: Request, res: Response) {
        try {
            const currencies = await currencyService.getAllCurrencies();
            log.debug('Currencies listed', { context: 'getAllCurrencies', count: currencies.length });
            res.status(200).json(currencies);
        } catch (error: any) {
            log.error('Failed to list currencies', { context: 'getAllCurrencies', error });
            res.status(500).json({ message: error.message });
        }
    }

    async getCurrencyById(req: Request, res: Response) {
        const id = +req.params.id;
        try {
            const currency = await currencyService.getCurrencyById(id);
            if (!currency) {
                log.warn('Currency not found', { context: 'getCurrencyById', currencyId: id });
                return res.status(404).json({ message: 'Currency not found' });
            }
            res.status(200).json(currency);
        } catch (error: any) {
            log.error('Failed to fetch currency', { context: 'getCurrencyById', currencyId: id, error });
            res.status(500).json({ message: error.message });
        }
    }

    async createCurrency(req: Request, res: Response) {
        try {
            const newCurrency = await currencyService.createCurrency(req.body);
            log.info('Currency created', { context: 'createCurrency', currencyId: newCurrency.currencyId });
            res.status(201).json(newCurrency);
        } catch (error: any) {
            log.error('Failed to create currency', { context: 'createCurrency', error });
            res.status(500).json({ message: error.message });
        }
    }

    async updateCurrency(req: Request, res: Response) {
        const id = +req.params.id;
        try {
            const updatedCurrency = await currencyService.updateCurrency(id, req.body);
            log.info('Currency updated', { context: 'updateCurrency', currencyId: id });
            res.status(200).json(updatedCurrency);
        } catch (error: any) {
            log.error('Failed to update currency', { context: 'updateCurrency', currencyId: id, error });
            res.status(500).json({ message: error.message });
        }
    }

    async deleteCurrency(req: Request, res: Response) {
        const id = +req.params.id;
        try {
            await currencyService.deleteCurrency(id);
            log.info('Currency deleted', { context: 'deleteCurrency', currencyId: id });
            res.status(204).send();
        } catch (error: any) {
            log.error('Failed to delete currency', { context: 'deleteCurrency', currencyId: id, error });
            res.status(500).json({ message: error.message });
        }
    }
}

export default new CurrencyController();
