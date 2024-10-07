import User from '../models/User';
import Shipment from '../models/Shipment';
import Tenant from '../models/Tenant';
import ShipmentStatus from '../models/ShipmentStatus';
import Origin from '../models/Origin';
import Destination from '../models/Destination';
import Container from '../models/Container';
import Truck from '../models/Truck';
import Document from '../models/Document';

class ShipmentService {
    async create(shipmentData: any) {
        const newShipment = await Shipment.create(shipmentData);
        return newShipment;
    }

    async getById(shipmentId: number) {
        return await Shipment.findByPk(shipmentId, {
            include: [
              { model: Tenant, as: 'tenant' },
              { model: ShipmentStatus, as: 'shipmentStatus' },
              { model: Origin, as: 'origin' },
              { model: Destination, as: 'destination' },
              { model: Container, as: 'container' },
              { model: Document, as: 'document' },
              {
                model: User,
                as: 'user',
                attributes: { exclude: ['password'] },
              },
              { model: Truck, as: 'truck' }
            ],
            attributes: { exclude: ['password'] }
        });
    }

    async update(shipmentId: number, updateData: any) {
        const shipment = await Shipment.findByPk(shipmentId);
        if (!shipment) {
            return null;
        }
        return await shipment.update(updateData);
    }

    async delete(shipmentId: number) {
        const shipment = await Shipment.findByPk(shipmentId);
        if (!shipment) {
            return null;
        }
        await shipment.destroy();
        return true;
    }

    async getAll() {
        return await Shipment.findAll({
          include: [
            { model: Tenant, as: 'tenant' },
            { model: ShipmentStatus, as: 'shipmentStatus' },
            { model: Origin, as: 'origin' },
            { model: Destination, as: 'destination' },
            { model: Container, as: 'container' },
            { model: Document, as: 'document' },
            {
              model: User,
              as: 'user',
              attributes: { exclude: ['password'] },
            },
            { model: Truck, as: 'truck' }
          ]
        });
    }
}

export default new ShipmentService();
