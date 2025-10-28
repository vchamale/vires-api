import Document from '../models/Document';
import Client from '@models/Client';

class DocumentService {
    async create(documentData: any) {
        const newDocument = await Document.create(documentData);
        return newDocument;
    }

    async getById(documentId: number, clientId: number) {
        return await Document.findOne({
            where: {
                documentId,
                clientId
            },
            include: [
                { model: Client, as: 'client' }
            ]
        });
    }

    async update(documentId: number, updateData: any) {
        const document = await Document.findByPk(documentId);
        if (!document) {
            return null;
        }
        return await document.update(updateData);
    }

    async delete(documentId: number) {
        const document = await Document.findByPk(documentId);
        if (!document) {
            return null;
        }
        await document.destroy();
        return true;
    }

    async getAll(filters: any = {}) {
        return await Document.findAll({
            where: filters,
            include: [
                { model: Client, as: 'client' }
            ]
        });
    }
}

export default new DocumentService();
