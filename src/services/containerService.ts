import Container from '../models/Container';

class ContainerService {
    async getAllContainers() {
        return await Container.findAll({ include: ['tenant', 'size'] });
    }

    async getContainerById(id: number) {
        return await Container.findByPk(id, { include: ['tenant', 'size'] });
    }

    async createContainer(containerData: {
        tenantId: number;
        sizeId: number;
        containerNumber: string;
    }) {
        return await Container.create(containerData);
    }

    async updateContainer(id: number, containerData: Partial<{ tenantId: number; sizeId: number; containerNumber: string; }>) {
        const container = await Container.findByPk(id);
        if (!container) {
            throw new Error('Container not found');
        }
        return await container.update(containerData);
    }

    async deleteContainer(id: number) {
        const container = await Container.findByPk(id);
        if (!container) {
            throw new Error('Container not found');
        }
        return await container.destroy();
    }
}

export default new ContainerService();
