import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import Tenant from './Tenant';

interface DocumentAttributes {
    document_id: number;
    tenant_id: number;
    document_number: string;
}

interface DocumentCreationAttributes extends Optional<DocumentAttributes, 'document_id'> {}

class Document extends Model<DocumentAttributes, DocumentCreationAttributes> implements DocumentAttributes {
    public document_id!: number;
    public tenant_id!: number;
    public document_number!: string;
}

Document.init({
    document_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    tenant_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Tenant,
            key: 'tenant_id'
        }
    },
    document_number: {
        type: DataTypes.STRING(25),
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Document',
    tableName: 'document',
    timestamps: false
});

Document.belongsTo(Tenant, { foreignKey: 'tenant_id' });

export default Document;
