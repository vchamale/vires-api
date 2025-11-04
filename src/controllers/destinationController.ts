import { Request, Response } from 'express';
import destinationService from '../services/destinationService';
import { col, fn, where } from 'sequelize';
import { Op } from 'sequelize';

class DestinationController {
  async getAllDestinations(req: Request, res: Response) {
    try {
      const { tenantId, search, clientId } = req.query;
      if (!tenantId) {
          return res.status(400).json({ message: 'Tenant ID is required' });
      }

      const filters: any = {};
      if (search) {
        filters[Op.or] = [
          where(fn('LOWER', col('name')), {
            [Op.like]: fn('LOWER',`%${search}%`),
          }),
          where(fn('LOWER', col('address')), {
            [Op.like]: fn('LOWER',`%${search}%`),
          }),
        ];
      }

      filters[Op.and] = [];

      if (clientId) {
        filters[Op.and].push({ client_id: clientId });
      }

      const destinations = await destinationService.getAllDestinations(filters, +tenantId);
      res.status(200).json(destinations);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async getDestinationById(req: Request, res: Response) {
    try {
      const destination = await destinationService.getDestinationById(+req.params.id);
      if (!destination) {
        return res.status(404).json({ message: 'Destination not found' });
      }
      res.status(200).json(destination);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async createDestination(req: Request, res: Response) {
    try {
      const { tenantId } = req.body;
      if (!tenantId) {
          return res.status(400).json({ message: 'Tenant ID is required' });
      }
      const newDestination = await destinationService.createDestination(req.body);
      res.status(201).json(newDestination);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateDestination(req: Request, res: Response) {
    try {
      const { tenantId } = req.body;
      if (!tenantId) {
          return res.status(400).json({ message: 'Tenant ID is required' });
      }
      const updatedDestination = await destinationService.updateDestination(+req.params.id, req.body);
      res.status(200).json(updatedDestination);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async deleteDestination(req: Request, res: Response) {
    try {
      const { tenantId } = req.query;
      if (!tenantId) {
          return res.status(400).json({ message: 'Tenant ID is required' });
      }
      await destinationService.deleteDestination(+req.params.id);
      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async getDestinationsByClientId(req: Request, res: Response) {
    try {
      const { tenantId, search } = req.query;
      const { clientId } = req.params;

      if (!tenantId) {
        return res.status(400).json({ message: 'Tenant ID is required' });
      }
      if (!clientId) {
        return res.status(400).json({ message: 'Client ID is required' });
      }

      const destinations = await destinationService.getDestinationsByClientId(
        +clientId,
        typeof search === 'string' ? search : undefined
      );

      return res.status(200).json(destinations);
    } catch (error: any) {
      console.error('Error fetching destinations by clientId:', error);
      return res.status(500).json({ message: error.message });
    }
  }
}

export default new DestinationController();