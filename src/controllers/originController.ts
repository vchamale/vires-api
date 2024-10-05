import { Request, Response } from 'express';
import originService from '../services/originService';

class OriginController {
  async getAllOrigins(req: Request, res: Response) {
    try {
      const origins = await originService.getAllOrigins();
      res.status(200).json(origins);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async getOriginById(req: Request, res: Response) {
    try {
      const origin = await originService.getOriginById(+req.params.id);
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
      const newOrigin = await originService.createOrigin(req.body);
      res.status(201).json(newOrigin);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateOrigin(req: Request, res: Response) {
    try {
      const updatedOrigin = await originService.updateOrigin(+req.params.id, req.body);
      res.status(200).json(updatedOrigin);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async deleteOrigin(req: Request, res: Response) {
    try {
      await originService.deleteOrigin(+req.params.id);
      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default new OriginController();
