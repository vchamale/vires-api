import { col, fn, where } from 'sequelize';
import Origin from '../models/Origin';
import { Op } from 'sequelize';
import Client from '@models/Client';

class OriginService {
  async getAllOrigin(filters: any = {}) {
    return await Origin.findAll({
      where: filters
    });
  }

  async getOriginById(originId: number, clientId: number) {
    return await Origin.findOne({
      where: {
        originId,
        clientId
      }
    });
  }

  async createOrigin(originData: {
    clientId: number;
    name: string;
    address: string;
  }) {
    console.log('asdasdsa ', originData)
    return await Origin.create(originData);
  }

  async updateOrigin(id: number, originData: Partial<{
    clientId: number;
    name: string;
    address: string;
  }>) {
    const origin = await Origin.findByPk(id);
    if (!origin) {
      throw new Error('Origin not found');
    }
    return await origin.update(originData);
  }

  async deleteOrigin(id: number) {
    const origin = await Origin.findByPk(id);
    if (!origin) {
      throw new Error('Origin not found');
    }
    return await origin.destroy();
  }

  async getOriginsByClientId(clientId: number, search?: string) {
    const whereClause: any = { clientId };

    if (search && search.trim().length > 0) {
      whereClause[Op.or] = [
        where(fn('LOWER', col('name')), { [Op.like]: fn('LOWER', `%${search}%`) }),
        where(fn('LOWER', col('address')), { [Op.like]: fn('LOWER', `%${search}%`) }),
      ];
    }

    return await Origin.findAll({
      where: whereClause,
      order: [['name', 'ASC']],
    });
  }
}

export default new OriginService();