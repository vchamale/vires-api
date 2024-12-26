import Destination from '../models/Destination';

class DestinationService {
  async getAllDestinations(filters: any = {}) {
    return await Destination.findAll({
      where: filters
    });
  }

  async getDestinationById(id: number) {
    return await Destination.findByPk(id);
  }

  async createDestination(destinationData: {
    clientId: number;
    name: string;
    address: string;
  }) {
    return await Destination.create(destinationData);
  }

  async updateDestination(id: number, destinationData: Partial<{
    clientId: number;
    name: string;
    address: string;
  }>) {
    const destination = await Destination.findByPk(id);
    if (!destination) {
      throw new Error('Destination not found');
    }
    return await destination.update(destinationData);
  }

  async deleteDestination(id: number) {
    const destination = await Destination.findByPk(id);
    if (!destination) {
      throw new Error('Destination not found');
    }
    return await destination.destroy();
  }
}

export default new DestinationService();