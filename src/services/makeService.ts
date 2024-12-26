import Make from '../models/Make';

class MakeService {
    async create(makeData: any) {
        return await Make.create(makeData);
    }

    async getById(makeId: number) {
        return await Make.findByPk(makeId);
    }

    async update(makeId: number, updateData: any) {
        const make = await Make.findByPk(makeId);
        if (!make) {
            return null;
        }
        return await make.update(updateData);
    }

    async delete(makeId: number) {
        const make = await Make.findByPk(makeId);
        if (!make) {
            return null;
        }
        await make.destroy();
        return true;
    }

    async getAll(filters: any = {}) {
        return await Make.findAll({
            where: filters,
        });
    }
}

export default new MakeService();
