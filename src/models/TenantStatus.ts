import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface TenantStatusAttributes {
    tenantStatusId: number;
    description: string;
}

interface TenantStatusCreationAttributes extends Optional<TenantStatusAttributes, 'tenantStatusId'> {}

class TenantStatus extends Model<TenantStatusAttributes, TenantStatusCreationAttributes>
    implements TenantStatusAttributes {
    public tenantStatusId!: number;
    public description!: string;
}

TenantStatus.init({
    tenantStatusId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    description: {
        type: DataTypes.STRING(25),
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'TenantStatus',
    tableName: 'tenant_status',
    underscored: true,
    timestamps: false
});

export default TenantStatus;
