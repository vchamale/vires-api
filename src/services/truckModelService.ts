import TruckModel from '../models/Model';
import Make from '../models/Make';

class TruckModelService {
    async create(truckModelData: any) {
        return await TruckModel.create(truckModelData);
    }

    async getById(modelId: number) {
        return await TruckModel.findByPk(modelId, {
            include: [{ model: Make, as: 'make' }],
        });
    }

    async update(modelId: number, updateData: any) {
        const truckModel = await TruckModel.findByPk(modelId);
        if (!truckModel) {
            return null;
        }
        return await truckModel.update(updateData);
    }

    async delete(modelId: number) {
        const truckModel = await TruckModel.findByPk(modelId);
        if (!truckModel) {
            return null;
        }
        await truckModel.destroy();
        return true;
    }

    async getAll(filters: any = {}) {
        return await TruckModel.findAll({
            where: filters,
            include: [{ model: Make, as: 'make' }],
        });
    }

    async getByMakeId(makeId: number) {
      return await TruckModel.findAll({
          where: { makeId }
      });
  }
}

export default new TruckModelService();
