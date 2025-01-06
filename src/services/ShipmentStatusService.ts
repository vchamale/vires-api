import ShipmentStatus from '../models/ShipmentStatus';

class ShipmentStatusService {
    async create(shipmentStatusData: any) {
        return await ShipmentStatus.create(shipmentStatusData);
    }

    async getById(shipmentStatusId: number) {
        return await ShipmentStatus.findByPk(shipmentStatusId);
    }

    async update(shipmentStatusId: number, updateData: any) {
        const shipmentStatus = await ShipmentStatus.findByPk(shipmentStatusId);
        if (!shipmentStatus) {
            return null;
        }
        return await shipmentStatus.update(updateData);
    }

    async delete(shipmentStatusId: number) {
        const shipmentStatus = await ShipmentStatus.findByPk(shipmentStatusId);
        if (!shipmentStatus) {
            return null;
        }
        await shipmentStatus.destroy();
        return true;
    }

    async getAll(filters: any = {}) {
        return await ShipmentStatus.findAll({ where: filters });
    }
}

export default new ShipmentStatusService();
