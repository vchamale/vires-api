import { col, fn, Op, where } from 'sequelize';
import Client from '../models/Client';
import Destination from '../models/Destination';

class DestinationService {
  async getAllDestinations(filters: any = {}, tenantId: number) {
    return await Destination.findAll({
      where: filters,
      include: [
        {
            model: Client,
            as: 'client',
            where: {
                tenantId: tenantId
            },
            attributes: []
        }
    ]
    });
  }

  async getDestinationById(destinationId: number) {
    return await Destination.findOne({
      where: {
        destinationId
      }
    });
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

  async getDestinationsByClientId(clientId: number, search?: string) {
    const whereClause: any = { clientId };

    if (search && search.trim()) {
      whereClause[Op.or] = [
        where(fn('LOWER', col('name')), { [Op.like]: fn('LOWER', `%${search}%`) }),
        where(fn('LOWER', col('address')), { [Op.like]: fn('LOWER', `%${search}%`) }),
      ];
    }

    return await Destination.findAll({
      where: whereClause,
      order: [['name', 'ASC']],
    });
  }
}

export default new DestinationService();