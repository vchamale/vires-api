import Container from '../models/Container';

class ContainerService {
    async getAllContainers(tenantId: number) {
        return await Container.findAll({ 
            where: {
                tenantId
            },
            include: ['tenant', 'size'] 
        });
    }

    async getContainerById(containerId: number, tenantId: number) {
        return await Container.findOne({ 
            where: {
                containerId,
                tenantId
            },
            include: ['tenant', 'size'] 
        });
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
