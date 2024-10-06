import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import Tenant from './Tenant';

interface OriginAttributes {
    originId: number;
    tenantId: number;
    name: string;
    address: string;
}

interface OriginCreationAttributes extends Optional<OriginAttributes, 'originId'> {}

class Origin extends Model<OriginAttributes, OriginCreationAttributes> implements OriginAttributes {
    public originId!: number;
    public tenantId!: number;
    public name!: string;
    public address!: string;
}

Origin.init({
    originId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    tenantId: {
        type: DataTypes.INTEGER,
        references: { model: Tenant, key: 'tenantId' }
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
    underscored: true,
    timestamps: false
});

Origin.belongsTo(Tenant, { as: 'tenant', foreignKey: 'tenantId' });

export default Origin;
