import { Request, Response } from 'express';
import TruckModelService from '../services/truckModelService';

class TruckModelController {
    async create(req: Request, res: Response) {
        try {
            const newTruckModel = await TruckModelService.create(req.body);
            return res.status(201).json(newTruckModel);
        } catch (error: any) {
            return res.status(400).json({ message: error.message });
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const truckModel = await TruckModelService.getById(parseInt(req.params.id));
            if (!truckModel) {
                return res.status(404).json({ message: 'Truck model not found' });
            }
            return res.status(200).json(truckModel);
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const updatedTruckModel = await TruckModelService.update(parseInt(req.params.id), req.body);
            if (!updatedTruckModel) {
                return res.status(404).json({ message: 'Truck model not found' });
            }
            return res.status(200).json(updatedTruckModel);
        } catch (error: any) {
            return res.status(400).json({ message: error.message });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const deleted = await TruckModelService.delete(parseInt(req.params.id));
            if (!deleted) {
                return res.status(404).json({ message: 'Truck model not found' });
            }
            return res.status(204).send();
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }

    async getAll(req: Request, res: Response) {
        try {
            const filters = req.query;
            const truckModels = await TruckModelService.getAll(filters);
            return res.status(200).json(truckModels);
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }
}

export default new TruckModelController();
