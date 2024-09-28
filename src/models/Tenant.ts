import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import TenantStatus from './TenantStatus';

interface TenantAttributes {
    tenant_id: number;
    subscription_id?: number;
    tenant_status_id: number;
    main_email: string;
    tenant_name: string;
    payment_id?: number;
}

interface TenantCreationAttributes extends Optional<TenantAttributes, 'tenant_id'> {}

class Tenant extends Model<TenantAttributes, TenantCreationAttributes> implements TenantAttributes {
    public tenant_id!: number;
    public subscription_id?: number;
    public tenant_status_id!: number;
    public main_email!: string;
    public tenant_name!: string;
    public payment_id?: number;
}

Tenant.init({
    tenant_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    subscription_id: DataTypes.INTEGER,
    tenant_status_id: {
        type: DataTypes.INTEGER,
        references: { model: TenantStatus, key: 'tenant_status_id' }
    },
    main_email: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    tenant_name: DataTypes.TEXT,
    payment_id: DataTypes.INTEGER
}, {
    sequelize,
    modelName: 'Tenant',
    tableName: 'tenant',
    timestamps: false
});

Tenant.belongsTo(TenantStatus, { foreignKey: 'tenant_status_id' });

export default Tenant;
