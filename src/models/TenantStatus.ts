import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface TenantStatusAttributes {
    tenant_status_id: number;
    description: string;
}

interface TenantStatusCreationAttributes extends Optional<TenantStatusAttributes, 'tenant_status_id'> {}

class TenantStatus extends Model<TenantStatusAttributes, TenantStatusCreationAttributes>
    implements TenantStatusAttributes {
    public tenant_status_id!: number;
    public description!: string;
}

TenantStatus.init({
    tenant_status_id: {
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
    timestamps: false
});

export default TenantStatus;
