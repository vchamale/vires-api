import { Request, Response } from 'express';
import truckService from '../services/truckService';
import { Op, literal } from 'sequelize';

class TruckController {
  async getAllTrucks(req: Request, res: Response) {
    try {
      const { tenantId } = req.query;
      if (!tenantId) {
          return res.status(400).json({ message: 'Tenant ID is required' });
      }
        const { search } = req.query;

        const filters: any = {};
        if (search) {
          filters[Op.or] = [
            literal(`LOWER(plate) LIKE LOWER('%${search}%')`),
            literal(`LOWER(vin) LIKE LOWER('%${search}%')`),
            literal(`LOWER(CAST(year AS TEXT)) LIKE LOWER('%${search}%')`),
            literal(`LOWER("model"."name") LIKE LOWER('%${search}%')`)
          ];
        }

        filters.tenantId = tenantId;
        const trucks = await truckService.getAllTrucks(filters);
        res.status(200).json(trucks);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
  }

  async getTruckById(req: Request, res: Response) {
    try {
      const { tenantId } = req.query;
      if (!tenantId) {
          return res.status(400).json({ message: 'Tenant ID is required' });
      }
      const truck = await truckService.getTruckById(+req.params.id, +tenantId);
      if (!truck) {
        return res.status(404).json({ message: 'Truck not found' });
      }
      res.status(200).json(truck);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async createTruck(req: Request, res: Response) {
    try {
      const { tenantId } = req.body;
      if (!tenantId) {
          return res.status(400).json({ message: 'Tenant ID is required' });
      }
      const newTruck = await truckService.createTruck(req.body);
      res.status(201).json(newTruck);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateTruck(req: Request, res: Response) {
    try {
      const { tenantId } = req.body;
      if (!tenantId) {
          return res.status(400).json({ message: 'Tenant ID is required' });
      }
      const updatedTruck = await truckService.updateTruck(+req.params.id, req.body);
      res.status(200).json(updatedTruck);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async deleteTruck(req: Request, res: Response) {
    try {
      const { tenantId } = req.query;
      if (!tenantId) {
          return res.status(400).json({ message: 'Tenant ID is required' });
      }
      await truckService.deleteTruck(+req.params.id);
      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default new TruckController();