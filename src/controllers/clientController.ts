import { Request, Response } from 'express';
import ClientService from '../services/clientService';

class ClientController {
    async createClient(req: Request, res: Response) {
        try {
            const newClient = await ClientService.create(req.body);
            return res.status(201).json(newClient);
        } catch (error: any) {
            return res.status(400).json({ message: error.message });
        }
    }

    async getClient(req: Request, res: Response) {
        try {
            const client = await ClientService.getById(parseInt(req.params.id));
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
          const clients = await ClientService.getAllClients();
          res.status(200).json(clients);
        } catch (error: any) {
          res.status(500).json({ message: error.message });
        }
      }

    async updateClient(req: Request, res: Response) {
        try {
            const updatedClient = await ClientService.update(parseInt(req.params.id), req.body);
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
            const deleted = await ClientService.delete(parseInt(req.params.id));
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
