import { Request, Response } from 'express';
import ShipmentService from '../services/shipmentService';
import { endOfDay, parseISO, startOfDay } from 'date-fns';
import { Op, col, fn, where } from 'sequelize';

class ShipmentController {
    async create(req: Request, res: Response): Promise<Response> {
        try {
            console.log('req.body ', req.body)
            const newShipment = await ShipmentService.create(req.body);
            return res.status(201).json(newShipment);
        } catch (error: any) {
            console.log('error ', error)
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
            console.log('here updating id ', req.params.id)
            const updatedShipment = await ShipmentService.update(parseInt(req.params.id), req.body);
            console.log('updatedShipment ', updatedShipment)
            if (!updatedShipment) {
                return res.status(404).json({ message: 'Shipment not found' });
            }
            return res.status(200).json(updatedShipment);
        } catch (error: any) {
            console.log('errr ', error)
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
            const { search, startDate, endDate } = req.query;

            const filters: any = {};
            if (search) {
                filters[Op.or] = [
                    where(fn('LOWER', col('shipmentStatus.description')), {
                        [Op.like]: fn('LOWER',`%${search}%`),
                    }), // Estado del envío
                    where(fn('LOWER', col('container.container_number')), {
                        [Op.like]: fn('LOWER',`%${search}%`),
                    }), // Número de contenedor
                    where(fn('LOWER', col('origin.name')), {
                        [Op.like]: fn('LOWER',`%${search}%`),
                    }), // Origen
                    where(fn('LOWER', col('destination.name')), {
                        [Op.like]: fn('LOWER',`%${search}%`),
                    }), // Destino
                    // where(fn('LOWER', col('client.name')), {
                    //     [Op.like]: fn('LOWER',`%${search}%`),
                    // }), // Cliente
                    // where(fn('LOWER', col('user.name')), {
                    //     [Op.like]: fn('LOWER',`%${search}%`),
                    // }), // Piloto
                ];
            }
            if (startDate || endDate) {
                filters.createdAt = {};
                if (startDate) {
                    // Convertimos startDate a T00:00:00.000Z
                    const start = startOfDay(parseISO(startDate as string));
                    filters.createdAt[Op.gte] = start;
                }

                if (endDate) {
                    // Convertimos endDate a T23:59:59.999Z
                    const end = endOfDay(parseISO(endDate as string));
                    filters.createdAt[Op.lte] = end;
                }
            }
            console.log('filters ship cont ', filters)
            const shipments = await ShipmentService.getAll(filters);
            return res.status(200).json(shipments);
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }
}

export default new ShipmentController();
