import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import Tenant from './Tenant';

interface DocumentAttributes {
    documentId: number;
    tenantId: number;
    documentNumber: string;
}

interface DocumentCreationAttributes extends Optional<DocumentAttributes, 'documentId'> {}

class Document extends Model<DocumentAttributes, DocumentCreationAttributes> implements DocumentAttributes {
    public documentId!: number;
    public tenantId!: number;
    public documentNumber!: string;
}

Document.init({
    documentId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    tenantId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Tenant,
            key: 'tenantId'
        }
    },
    documentNumber: {
        type: DataTypes.STRING(25),
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Document',
    tableName: 'document',
    underscored: true,
    timestamps: false
});

Document.belongsTo(Tenant, { as: 'tenant', foreignKey: 'tenantId' });

export default Document;
