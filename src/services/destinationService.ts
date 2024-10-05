import Destination from '../models/Destination';

class DestinationService {
  async getAllDestinations() {
    return await Destination.findAll();
  }

  async getDestinationById(id: number) {
    return await Destination.findByPk(id);
  }

  async createDestination(destinationData: {
    client_id: number;
    name: string;
    address: string;
  }) {
    return await Destination.create(destinationData);
  }

  async updateDestination(id: number, destinationData: Partial<{
    client_id: number;
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