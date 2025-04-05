import { Request, Response } from 'express';
import ClientService from '../services/clientService';
import { Op, literal } from 'sequelize';

class ClientController {
    async createClient(req: Request, res: Response) {
        try {
            const { tenantId } = req.body;
            if (!tenantId) {
                return res.status(400).json({ message: 'Tenant ID is required' });
            }
            const newClient = await ClientService.create(req.body);
            return res.status(201).json(newClient);
        } catch (error: any) {
            return res.status(400).json({ message: error.message });
        }
    }

    async getClient(req: Request, res: Response) {
        try {
            const { tenantId } = req.query;
            if (!tenantId) {
                return res.status(400).json({ message: 'Tenant ID is required' });
            }

            const client = await ClientService.getById(+req.params.id, +tenantId);
            if (!client) {
                return res.status(404).json({ message: 'Client not found' });
            }
            return res.status(200).json(client);
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }

    async getAllClients(req: Request, res: Response) {
        try {
            const { tenantId } = req.query;
            if (!tenantId) {
                return res.status(400).json({ message: 'Tenant ID is required' });
            }
            const { search } = req.query;

            const filters: any = {};

            if (search) {
                const lowerSearch = search.toString().toLowerCase();

                filters[Op.or] = [
                    literal(`LOWER(nit) LIKE LOWER('%${lowerSearch}%')`), // NIT insensible al caso
                    literal(`LOWER(name) LIKE LOWER('%${lowerSearch}%')`), // Name insensible al caso
                    literal(`LOWER(address) LIKE LOWER('%${lowerSearch}%')`), // Address insensible al caso
                    literal(`LOWER(email) LIKE LOWER('%${lowerSearch}%')`) // Email insensible al caso
                ];
            }

            filters.tenantId = tenantId;

            const clients = await ClientService.getAllClients(filters);
            res.status(200).json(clients);
        } catch (error: any) {
            console.error('Error fetching clients:', error);
            res.status(500).json({ message: error.message });
        }
    }

    async updateClient(req: Request, res: Response) {
        try {
            const { tenantId } = req.body;
            if (!tenantId) {
                return res.status(400).json({ message: 'Tenant ID is required' });
            }
            const updatedClient = await ClientService.update(+req.params.id, req.body);
            if (!updatedClient) {
                return res.status(404).json({ message: 'Client not found' });
            }
            return res.status(200).json(updatedClient);
        } catch (error: any) {
            return res.status(400).json({ message: error.message });
        }
    }

    async deleteClient(req: Request, res: Response) {
        try {
            const { tenantId } = req.query;
            if (!tenantId) {
                return res.status(400).json({ message: 'Tenant ID is required' });
            }
            const deleted = await ClientService.delete(+req.params.id);
            if (!deleted) {
                return res.status(404).json({ message: 'Client not found' });
            }
            return res.status(204).json();
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }
}

export default new ClientController();
