import { Request, Response } from 'express';
import ShipmentService from '../services/shipmentService';
import { endOfDay, parseISO, startOfDay } from 'date-fns';
import { Op, col, fn, where } from 'sequelize';

class ShipmentController {
    async create(req: Request, res: Response): Promise<Response> {
        try {
            const { tenantId } = req.body;
            if (!tenantId) {
                return res.status(400).json({ message: 'Tenant ID is required' });
            }

            const newShipment = await ShipmentService.create(req.body);
            return res.status(201).json(newShipment);
        } catch (error: any) {
            console.log('error ', error)
            return res.status(400).json({ message: error.message });
        }
    }

    async getById(req: Request, res: Response): Promise<Response> {
        try {
            const { tenantId } = req.query;
            if (!tenantId) {
                return res.status(400).json({ message: 'Tenant ID is required' });
            }
            const shipment = await ShipmentService.getById(+req.params.id, +tenantId);
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
            const { tenantId } = req.body;
            if (!tenantId) {
                return res.status(400).json({ message: 'Tenant ID is required' });
            }
            const updatedShipment = await ShipmentService.update(+req.params.id, req.body);
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
            const { tenantId } = req.query;
            if (!tenantId) {
                return res.status(400).json({ message: 'Tenant ID is required' });
            }
            const deleted = await ShipmentService.delete(+req.params.id, +tenantId);
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
            const { tenantId } = req.query;
            if (!tenantId) {
                return res.status(400).json({ message: 'Tenant ID is required' });
            }

            const { search, startDate, endDate, driverId, clientId, stateId } = req.query;

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
                ];
            }
            if (startDate || endDate || driverId || clientId || stateId) {
                if (startDate) {
                    filters.dateCreated = {}
                    const start = startOfDay(parseISO(startDate as string));
                    filters.dateCreated[Op.gte] = start;
                }

                if (endDate) {
                    filters.dateCreated = {}
                    const end = endOfDay(parseISO(endDate as string));
                    filters.dateCreated[Op.lte] = end;
                }
                if (driverId) {
                    filters.driverId = driverId;
                }
                if (clientId) {
                    filters.clientId = clientId;
                }
                if (stateId) {
                    filters.shipmentStatusId = stateId;
                }
            }

            filters.tenantId = tenantId;

            console.log('filters ====== ', filters)

            const shipments = await ShipmentService.getAll(filters);
            return res.status(200).json(shipments);
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }

    // async getAll(req: Request, res: Response): Promise<Response> {
    //     try {
    //         const { tenantId } = req.query;
    //         if (!tenantId) {
    //             return res.status(400).json({ message: 'Tenant ID is required' });
    //         }

    //         const { search, startDate, endDate } = req.query;

    //         const filters: any = {};
    //         if (search) {
    //             filters[Op.or] = [
    //                 where(fn('LOWER', col('shipmentStatus.description')), {
    //                     [Op.like]: fn('LOWER',`%${search}%`),
    //                 }), // Estado del envío
    //                 where(fn('LOWER', col('container.container_number')), {
    //                     [Op.like]: fn('LOWER',`%${search}%`),
    //                 }), // Número de contenedor
    //                 where(fn('LOWER', col('origin.name')), {
    //                     [Op.like]: fn('LOWER',`%${search}%`),
    //                 }), // Origen
    //                 where(fn('LOWER', col('destination.name')), {
    //                     [Op.like]: fn('LOWER',`%${search}%`),
    //                 }), // Destino
    //             ];
    //         }
    //         if (startDate || endDate) {
    //             filters.dateCreated = {};
    //             if (startDate) {
    //                 const start = startOfDay(parseISO(startDate as string));
    //                 filters.dateCreated[Op.gte] = start;
    //             }

    //             if (endDate) {
    //                 const end = endOfDay(parseISO(endDate as string));
    //                 filters.dateCreated[Op.lte] = end;
    //             }
    //         }

    //         filters.tenantId = tenantId;

    //         const shipments = await ShipmentService.getAll(filters);
    //         return res.status(200).json(shipments);
    //     } catch (error: any) {
    //         return res.status(500).json({ message: error.message });
    //     }
    // }
    
}

export default new ShipmentController();
