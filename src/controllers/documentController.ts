import { Request, Response } from 'express';
import { Op, literal } from 'sequelize';
import { startOfDay, endOfDay, add, parseISO } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import DocumentService from '../services/documentService';

class DocumentController {
    // async create(req: Request, res: Response): Promise<Response>  {
    async create(req: Request, res: Response) {
        try {
            const newDocument = await DocumentService.create(document);
            return res.status(201).json(newDocument);
        } catch (error: any) {
            return res.status(400).json({ message: error.message });
        }
    }

    async getById(req: Request, res: Response): Promise<Response> {
        try {
            const document = await DocumentService.getById(parseInt(req.params.id));
            if (!document) {
                return res.status(404).json({ message: 'Document not found' });
            }
            return res.status(200).json(document);
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }

    async update(req: Request, res: Response): Promise<Response> {
        try {
            const updatedDocument = await DocumentService.update(parseInt(req.params.id), req.body);
            if (!updatedDocument) {
                return res.status(404).json({ message: 'Document not found' });
            }
            return res.status(200).json(updatedDocument);
        } catch (error: any) {
            return res.status(400).json({ message: error.message });
        }
    }

    async delete(req: Request, res: Response): Promise<Response> {
        try {
            const deleted = await DocumentService.delete(parseInt(req.params.id));
            if (!deleted) {
                return res.status(404).json({ message: 'Document not found' });
            }
            return res.status(204).send();
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }

    async getAll(req: Request, res: Response) {
        try {
            const { documentNumber, startDate, endDate } = req.query;

            const filters: any = {};
            if (documentNumber) {
                filters.documentNumber = { [Op.like]: `%${documentNumber}%` };
            }
            if (startDate || endDate) {
                filters.createdAt = {};
                if (startDate) {
                    // Convertimos startDate a T00:00:00.000Z
                    const start = startOfDay(parseISO(startDate as string));
                    filters.createdAt[Op.gte] = start;
                }

                if (endDate) {
                    // Convertimos endDate a T23:59:59.999Z
                    const end = endOfDay(parseISO(endDate as string));
                    filters.createdAt[Op.lte] = end;
                }
            }

            const documents = await DocumentService.getAll(filters);

            res.status(200).json(documents);
        } catch (error) {
            console.error('Error fetching documents:', error);
            res.status(500).json({ error: 'Failed to fetch documents' });
        }
    }
}

export default new DocumentController();
