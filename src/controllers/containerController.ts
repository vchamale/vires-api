import { Request, Response } from 'express';
import containerService from '../services/containerService';

class ContainerController {
    async getAllContainers(req: Request, res: Response) {
        try {
            const containers = await containerService.getAllContainers();
            res.status(200).json(containers);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async getContainerById(req: Request, res: Response) {
        try {
            const container = await containerService.getContainerById(+req.params.id);
            if (!container) {
                return res.status(404).json({ message: 'Container not found' });
            }
            res.status(200).json(container);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async createContainer(req: Request, res: Response) {
        try {
            const newContainer = await containerService.createContainer(req.body);
            res.status(201).json(newContainer);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateContainer(req: Request, res: Response) {
        try {
            const updatedContainer = await containerService.updateContainer(+req.params.id, req.body);
            res.status(200).json(updatedContainer);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async deleteContainer(req: Request, res: Response) {
        try {
            await containerService.deleteContainer(+req.params.id);
            res.status(204).send();
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
}

export default new ContainerController();
