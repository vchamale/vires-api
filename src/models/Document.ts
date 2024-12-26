import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import Tenant from './Tenant';

interface DocumentAttributes {
    documentId: number;
    tenantId: number;
    documentNumber: string;
    createdAt: Date;
    updatedAt: Date;
    createdBy?: number;
    updatedBy?: number;
}

interface DocumentCreationAttributes extends Optional<DocumentAttributes, 'documentId' | 'createdAt' | 'updatedAt' | 'createdBy' | 'updatedBy'> {}

class Document extends Model<DocumentAttributes, DocumentCreationAttributes> implements DocumentAttributes {
    public documentId!: number;
    public tenantId!: number;
    public documentNumber!: string;
    public createdAt!: Date;
    public updatedAt!: Date;
    public createdBy?: number;
    public updatedBy?: number;
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
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    createdBy: {
        type: DataTypes.INTEGER,
        references: {
            model: 'app_user',
            key: 'user_id'
        },
        allowNull: true
    },
    updatedBy: {
        type: DataTypes.INTEGER,
        references: {
            model: 'app_user',
            key: 'user_id'
        },
        allowNull: true
    }
}, {
    sequelize,
    modelName: 'Document',
    tableName: 'document',
    underscored: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

Document.belongsTo(Tenant, { as: 'tenant', foreignKey: 'tenantId' });

export default Document;