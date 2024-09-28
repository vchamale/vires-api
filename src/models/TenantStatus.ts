import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '@config/database';

// Definimos los atributos de TenantStatus
interface TenantStatusAttributes {
    tenant_status_id: number;
    description: string;
}

// Definimos los atributos opcionales para la creación de un TenantStatus
interface TenantStatusCreationAttributes extends Optional<TenantStatusAttributes, 'tenant_status_id'> {}

class TenantStatus extends Model<TenantStatusAttributes, TenantStatusCreationAttributes>
    implements TenantStatusAttributes {
    public tenant_status_id!: number;
    public description!: string;
}

// Inicializamos el modelo TenantStatus
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
