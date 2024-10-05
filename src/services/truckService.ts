import Truck from '../models/Truck';

class TruckService {
  async getAllTrucks() {
    return await Truck.findAll({ include: ['Tenant', 'Model'] });
  }

  async getTruckById(id: number) {
    return await Truck.findByPk(id, { include: ['Tenant', 'Model'] });
  }

  async createTruck(truckData: {
    tenant_id: number;
    model_id: number;
    year: number;
    plate: string;
    vin: string;
    status: boolean;
  }) {
    return await Truck.create(truckData);
  }

  async updateTruck(id: number, truckData: Partial<{
    tenant_id: number;
    model_id: number;
    year: number;
    plate: string;
    vin: string;
    status: boolean;
  }>) {
    const truck = await Truck.findByPk(id);
    if (!truck) {
      throw new Error('Truck not found');
    }
    return await truck.update(truckData);
  }

  async deleteTruck(id: number) {
    const truck = await Truck.findByPk(id);
    if (!truck) {
      throw new Error('Truck not found');
    }
    return await truck.destroy();
  }
}

export default new TruckService();