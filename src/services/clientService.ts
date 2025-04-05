import Client from '../models/Client';

class ClientService {
    async create(clientData: any) {
        const newClient = await Client.create(clientData);
        return newClient;
    }

    async getById(clientId: number, tenantId: number) {
        return await Client.findOne({
            where: {
                clientId,
                tenantId
            }
        });
    }

    async getAllClients(filters: any = {}) {
        return await Client.findAll({
            where: filters,
            include: ['tenant'], // Incluye relaciones necesarias
        });
    }

    async update(clientId: number, updateData: any) {
        const client = await Client.findByPk(clientId);
        if (!client) {
            return null;
        }
        return await client.update(updateData);
    }

    async delete(clientId: number) {
        const client = await Client.findByPk(clientId);
        if (!client) {
            return null;
        }
        await client.destroy();
        return true;
    }
}

export default new ClientService();
