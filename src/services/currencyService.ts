import Currency from '../models/Currency';

class CurrencyService {
    async getAllCurrencies() {
        return await Currency.findAll();
    }

    async getCurrencyById(id: number) {
        return await Currency.findByPk(id);
    }

    async createCurrency(currencyData: {
        name: string;
        simbol: string;
    }) {
        return await Currency.create(currencyData);
    }

    async updateCurrency(id: number, currencyData: Partial<{ name: string; simbol: string; }>) {
        const currency = await Currency.findByPk(id);
        if (!currency) {
            throw new Error('Currency not found');
        }
        return await currency.update(currencyData);
    }

    async deleteCurrency(id: number) {
        const currency = await Currency.findByPk(id);
        if (!currency) {
            throw new Error('Currency not found');
        }
        return await currency.destroy();
    }
}

export default new CurrencyService();
