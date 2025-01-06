import { Request, Response } from 'express';
import ShipmentStatusService from '../services/ShipmentStatusService';

class ShipmentStatusController {
    async create(req: Request, res: Response): Promise<Response> {
        try {
            const newShipmentStatus = await ShipmentStatusService.create(req.body);
            return res.status(201).json(newShipmentStatus);
        } catch (error: any) {
            return res.status(400).json({ message: error.message });
        }
    }

    async getById(req: Request, res: Response): Promise<Response> {
        try {
            const shipmentStatus = await ShipmentStatusService.getById(parseInt(req.params.id));
            if (!shipmentStatus) {
                return res.status(404).json({ message: 'Shipment Status not found' });
            }
            return res.status(200).json(shipmentStatus);
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }

    async update(req: Request, res: Response): Promise<Response> {
        try {
            const updatedShipmentStatus = await ShipmentStatusService.update(parseInt(req.params.id), req.body);
            if (!updatedShipmentStatus) {
                return res.status(404).json({ message: 'Shipment Status not found' });
            }
            return res.status(200).json(updatedShipmentStatus);
        } catch (error: any) {
            return res.status(400).json({ message: error.message });
        }
    }

    async delete(req: Request, res: Response): Promise<Response> {
        try {
            const deleted = await ShipmentStatusService.delete(parseInt(req.params.id));
            if (!deleted) {
                return res.status(404).json({ message: 'Shipment Status not found' });
            }
            return res.status(204).send();
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }

    async getAll(req: Request, res: Response): Promise<Response> {
        try {
            const shipmentStatuses = await ShipmentStatusService.getAll();
            return res.status(200).json(shipmentStatuses);
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }
}

export default new ShipmentStatusController();
