import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import Tenant from './Tenant';

interface OriginAttributes {
    origin_id: number;
    tenant_id: number;
    name: string;
    address: string;
}

interface OriginCreationAttributes extends Optional<OriginAttributes, 'origin_id'> {}

class Origin extends Model<OriginAttributes, OriginCreationAttributes> implements OriginAttributes {
    public origin_id!: number;
    public tenant_id!: number;
    public name!: string;
    public address!: string;
}

Origin.init({
    origin_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    tenant_id: {
        type: DataTypes.INTEGER,
        references: { model: Tenant, key: 'tenant_id' }
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    address: {
        type: DataTypes.STRING(255),
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Origin',
    tableName: 'origin',
    timestamps: false
});

Origin.belongsTo(Tenant, { foreignKey: 'tenant_id' });

export default Origin;
