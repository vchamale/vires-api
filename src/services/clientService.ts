import Client from '../models/Client';

class ClientService {
    async create(clientData: any) {
        const newClient = await Client.create(clientData);
        return newClient;
    }

    async getById(clientId: number) {
        return await Client.findByPk(clientId);
    }

    async getAllClients() {
        return await Client.findAll({ include: ['Tenant'] });
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
