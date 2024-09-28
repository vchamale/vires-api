import Shipment from '../models/Shipment';

class ShipmentService {
    async create(shipmentData: any) {
        const newShipment = await Shipment.create(shipmentData);
        return newShipment;
    }

    async getById(shipmentId: number) {
        return await Shipment.findByPk(shipmentId, {
            include: ['Tenant', 'ShipmentStatus', 'Origin', 'Destination', 'Container', 'Document', 'User', 'Truck']
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
            include: ['Tenant', 'ShipmentStatus', 'Origin', 'Destination', 'Container', 'Document', 'User', 'Truck']
        });
    }
}

export default new ShipmentService();
