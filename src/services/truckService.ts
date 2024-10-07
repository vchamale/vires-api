import Truck from '../models/Truck';

class TruckService {
  async getAllTrucks() {
    return await Truck.findAll({ include: ['tenant', 'model'] });
  }

  async getTruckById(id: number) {
    return await Truck.findByPk(id, { include: ['tenant', 'model'] });
  }

  async createTruck(truckData: {
    tenantId: number;
    modelId: number;
    year: number;
    plate: string;
    vin: string;
    status: boolean;
  }) {
    return await Truck.create(truckData);
  }

  async updateTruck(id: number, truckData: Partial<{
    tenantId: number;
    modelId: number;
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