import { Request, Response } from 'express';
import truckService from '../services/truckService';

class TruckController {
  async getAllTrucks(req: Request, res: Response) {
    try {
      const trucks = await truckService.getAllTrucks();
      res.status(200).json(trucks);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async getTruckById(req: Request, res: Response) {
    try {
      const truck = await truckService.getTruckById(+req.params.id);
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
      const newTruck = await truckService.createTruck(req.body);
      res.status(201).json(newTruck);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateTruck(req: Request, res: Response) {
    try {
      const updatedTruck = await truckService.updateTruck(+req.params.id, req.body);
      res.status(200).json(updatedTruck);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async deleteTruck(req: Request, res: Response) {
    try {
      await truckService.deleteTruck(+req.params.id);
      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default new TruckController();