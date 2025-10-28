import { Request, Response } from 'express';
import SizeService from '../services/sizeService';
import { Op, col, fn, where } from 'sequelize';

class SizeController {
  // GET /sizes?search=...&limit=...&offset=...
  async getAllSizes(req: Request, res: Response) {
    try {
      const { search, limit, offset } = req.query;

      // Filtros de búsqueda opcional (description ILIKE '%search%' o feet == search si es número)
      const filters: any = {};
      if (search && typeof search === 'string' && search.trim().length > 0) {
        const isNumeric = /^\d+$/.test(search.trim());

        const orConditions: any[] = [
          where(fn('LOWER', col('description')), {
            [Op.like]: fn('LOWER', `%${search.trim()}%`),
          }),
        ];

        if (isNumeric) {
          orConditions.push({ feet: Number(search.trim()) });
        }

        filters[Op.or] = orConditions;
      }

      // Paginación opcional
      const pagination = {
        limit: limit ? Number(limit) : undefined,
        offset: offset ? Number(offset) : undefined,
      };

      const sizes = await SizeService.getAllSizes(filters, pagination);
      res.status(200).json(sizes);
    } catch (error: any) {
      console.error('Error fetching sizes:', error);
      res.status(500).json({ message: error.message });
    }
  }

  // GET /sizes/:id
  async getSizeById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const size = await SizeService.getSizeById(id);
      if (!size) {
        return res.status(404).json({ message: 'Size not found' });
      }
      res.status(200).json(size);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  // POST /sizes
  async createSize(req: Request, res: Response) {
    try {
      const { description, feet } = req.body;

      if (!description || typeof description !== 'string') {
        return res.status(400).json({ message: 'description is required' });
      }
      if (feet === undefined || feet === null || Number.isNaN(Number(feet))) {
        return res.status(400).json({ message: 'feet is required and must be a number' });
      }

      const newSize = await SizeService.createSize({
        description: description.trim(),
        feet: Number(feet),
      });

      res.status(201).json(newSize);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  // PUT /sizes/:id
  async updateSize(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const { description, feet } = req.body;

      const payload: Partial<{ description: string; feet: number }> = {};
      if (typeof description === 'string') payload.description = description.trim();
      if (feet !== undefined) payload.feet = Number(feet);

      const updated = await SizeService.updateSize(id, payload);
      res.status(200).json(updated);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  // DELETE /sizes/:id
  async deleteSize(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      await SizeService.deleteSize(id);
      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default new SizeController();
