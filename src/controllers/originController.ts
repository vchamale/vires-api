import { Request, Response } from 'express';
import OriginService from '../services/originService';
import { Op, col, fn, where } from 'sequelize';

class OriginController {
  async getAllOrigins(req: Request, res: Response) {
    try {
      const { tenantId } = req.query;
      if (!tenantId) {
          return res.status(400).json({ message: 'Tenant ID is required' });
      }
      const { search } = req.query;
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

      filters.tenantId = tenantId;
      const origins = await OriginService.getAllOrigin(filters);

      res.status(200).json(origins);
    } catch (error: any) {
      console.error('Error fetching origins:', error);
      res.status(500).json({ message: error.message });
    }
  }

  async getOriginById(req: Request, res: Response) {
    try {
      const { tenantId } = req.query;
      if (!tenantId) {
          return res.status(400).json({ message: 'Tenant ID is required' });
      }
      const origin = await OriginService.getOriginById(+req.params.id, +tenantId);
      if (!origin) {
        return res.status(404).json({ message: 'Origin not found' });
      }
      res.status(200).json(origin);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async createOrigin(req: Request, res: Response) {
    try {
      const { tenantId } = req.body;
      if (!tenantId) {
          return res.status(400).json({ message: 'Tenant ID is required' });
      }
      const newOrigin = await OriginService.createOrigin(req.body);
      res.status(201).json(newOrigin);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateOrigin(req: Request, res: Response) {
    try {
      const { tenantId } = req.body;
      if (!tenantId) {
          return res.status(400).json({ message: 'Tenant ID is required' });
      }
      const updatedOrigin = await OriginService.updateOrigin(+req.params.id, req.body);
      res.status(200).json(updatedOrigin);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async deleteOrigin(req: Request, res: Response) {
    try {
      const { tenantId } = req.query;
      if (!tenantId) {
          return res.status(400).json({ message: 'Tenant ID is required' });
      }
      await OriginService.deleteOrigin(+req.params.id);
      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default new OriginController();
