import { Request, Response } from 'express';
import currencyService from '../services/currencyService';

class CurrencyController {
    async getAllCurrencies(req: Request, res: Response) {
        try {
            const currencies = await currencyService.getAllCurrencies();
            res.status(200).json(currencies);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async getCurrencyById(req: Request, res: Response) {
        try {
            const currency = await currencyService.getCurrencyById(+req.params.id);
            if (!currency) {
                return res.status(404).json({ message: 'Currency not found' });
            }
            res.status(200).json(currency);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async createCurrency(req: Request, res: Response) {
        try {
            const newCurrency = await currencyService.createCurrency(req.body);
            res.status(201).json(newCurrency);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateCurrency(req: Request, res: Response) {
        try {
            const updatedCurrency = await currencyService.updateCurrency(+req.params.id, req.body);
            res.status(200).json(updatedCurrency);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async deleteCurrency(req: Request, res: Response) {
        try {
            await currencyService.deleteCurrency(+req.params.id);
            res.status(204).send();
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
}

export default new CurrencyController();
