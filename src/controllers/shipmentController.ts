import { Request, Response } from 'express';
import ShipmentService from '../services/shipmentService';

class ShipmentController {
    async create(req: Request, res: Response): Promise<Response> {
        try {
            const newShipment = await ShipmentService.create(req.body);
            return res.status(201).json(newShipment);
        } catch (error: any) {
            return res.status(400).json({ message: error.message });
        }
    }

    async getById(req: Request, res: Response): Promise<Response> {
        try {
            const shipment = await ShipmentService.getById(parseInt(req.params.id));
            if (!shipment) {
                return res.status(404).json({ message: 'Shipment not found' });
            }
            return res.status(200).json(shipment);
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }

    async update(req: Request, res: Response): Promise<Response> {
        try {
            const updatedShipment = await ShipmentService.update(parseInt(req.params.id), req.body);
            if (!updatedShipment) {
                return res.status(404).json({ message: 'Shipment not found' });
            }
            return res.status(200).json(updatedShipment);
        } catch (error: any) {
            return res.status(400).json({ message: error.message });
        }
    }

    async delete(req: Request, res: Response): Promise<Response> {
        try {
            const deleted = await ShipmentService.delete(parseInt(req.params.id));
            if (!deleted) {
                return res.status(404).json({ message: 'Shipment not found' });
            }
            return res.status(204).send();
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }

    async getAll(req: Request, res: Response): Promise<Response> {
        try {
            const shipments = await ShipmentService.getAll();
            return res.status(200).json(shipments);
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }
}

export default new ShipmentController();
