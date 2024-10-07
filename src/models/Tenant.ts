import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import TenantStatus from './TenantStatus';

interface TenantAttributes {
    tenantId: number;
    subscriptionId?: number;
    tenantStatusId: number;
    mainEmail: string;
    tenantName: string;
    paymentId?: number;
}

interface TenantCreationAttributes extends Optional<TenantAttributes, 'tenantId'> {}

class Tenant extends Model<TenantAttributes, TenantCreationAttributes> implements TenantAttributes {
    public tenantId!: number;
    public subscriptionId?: number;
    public tenantStatusId!: number;
    public mainEmail!: string;
    public tenantName!: string;
    public paymentId?: number;
}

Tenant.init({
    tenantId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    subscriptionId: DataTypes.INTEGER,
    tenantStatusId: {
        type: DataTypes.INTEGER,
        references: { model: TenantStatus, key: 'tenantStatusId' }
    },
    mainEmail: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    tenantName: DataTypes.TEXT,
    paymentId: DataTypes.INTEGER
}, {
    sequelize,
    modelName: 'Tenant',
    tableName: 'tenant',
    underscored: true,
    timestamps: false
});

Tenant.belongsTo(TenantStatus, { as: 'tenantStatus', foreignKey: 'tenantStatusId' });

export default Tenant;
