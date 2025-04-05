import { Op } from 'sequelize';
import Document from '../models/Document';
import Tenant from '../models/Tenant';

class DocumentService {
    async create(documentData: any) {
        const newDocument = await Document.create(documentData);
        return newDocument;
    }

    async getById(documentId: number, tenantId: number) {
        return await Document.findOne({
            where: {
                documentId,
                tenantId
            },
            include: [
                { model: Tenant, as: 'tenant' }
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
                { model: Tenant, as: 'tenant' }
            ]
        });
    }
}

export default new DocumentService();
