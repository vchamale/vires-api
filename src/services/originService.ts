import Origin from '../models/Origin';

class OriginService {
  async getAllOrigins() {
    return await Origin.findAll();
  }

  async getOriginById(id: number) {
    return await Origin.findByPk(id);
  }

  async createOrigin(originData: {
    tenantId: number;
    name: string;
    address: string;
  }) {
    return await Origin.create(originData);
  }

  async updateOrigin(id: number, originData: Partial<{
    tenantId: number;
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
}

export default new OriginService();