import { FindOptions } from 'sequelize';
import Size from '../models/Size';

class SizeService {
  async getAllSizes(filters: any = {}, pagination?: { limit?: number; offset?: number }) {
    const options: FindOptions = {
      where: filters,
      order: [['description', 'ASC']],
    };

    if (pagination?.limit !== undefined) {
      options.limit = pagination.limit;
    }
    if (pagination?.offset !== undefined) {
      options.offset = pagination.offset;
    }

    return await Size.findAll(options);
  }

  async getSizeById(sizeId: number) {
    return await Size.findByPk(sizeId);
  }

  async createSize(sizeData: { description: string; feet: number }) {
    return await Size.create(sizeData);
  }

  async updateSize(
    id: number,
    sizeData: Partial<{ description: string; feet: number }>
  ) {
    const size = await Size.findByPk(id);
    if (!size) {
      throw new Error('Size not found');
    }
    return await size.update(sizeData);
  }

  async deleteSize(id: number) {
    const size = await Size.findByPk(id);
    if (!size) {
      throw new Error('Size not found');
    }
    return await size.destroy();
  }
}

export default new SizeService();