import { Request, Response } from 'express';
import MakeService from '../services/makeService';
import truckModelService from '../services/truckModelService';

class MakeController {
    async create(req: Request, res: Response) {
        try {
            const { tenantId } = req.body;
            if (!tenantId) {
                return res.status(400).json({ message: 'Tenant ID is required' });
            }
            const newMake = await MakeService.create(req.body);
            return res.status(201).json(newMake);
        } catch (error: any) {
            return res.status(400).json({ message: error.message });
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const { tenantId } = req.query;
            if (!tenantId) {
                return res.status(400).json({ message: 'Tenant ID is required' });
            }
            const make = await MakeService.getById(+req.params.id);
            if (!make) {
                return res.status(404).json({ message: 'Make not found' });
            }
            return res.status(200).json(make);
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { tenantId } = req.body;
            if (!tenantId) {
                return res.status(400).json({ message: 'Tenant ID is required' });
            }
            const updatedMake = await MakeService.update(+req.params.id, req.body);
            if (!updatedMake) {
                return res.status(404).json({ message: 'Make not found' });
            }
            return res.status(200).json(updatedMake);
        } catch (error: any) {
            return res.status(400).json({ message: error.message });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const { tenantId } = req.query;
            if (!tenantId) {
                return res.status(400).json({ message: 'Tenant ID is required' });
            }
            const deleted = await MakeService.delete(+req.params.id);
            if (!deleted) {
                return res.status(404).json({ message: 'Make not found' });
            }
            return res.status(204).send();
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }

    async getAll(req: Request, res: Response) {
        try {
            // const { tenantId } = req.query;
            // if (!tenantId) {
            //     return res.status(400).json({ message: 'Tenant ID is required' });
            // }
            const filters = req.query;
            const makes = await MakeService.getAll(filters);
            return res.status(200).json(makes);
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }

    async getModelsByMakeId(req: Request, res: Response) {
      try {
        const { tenantId } = req.query;
        if (!tenantId) {
            return res.status(400).json({ message: 'Tenant ID is required' });
        }
          const makeId = +req.params.makeId;
          const truckModels = await truckModelService.getByMakeId(makeId);

          // if (!truckModels.length) {
          //     return res.status(404).json({ message: 'No truck models found for the specified makeId' });
          // }

          return res.status(200).json(truckModels);
      } catch (error: any) {
          return res.status(500).json({ message: error.message });
      }
    }
}

export default new MakeController();