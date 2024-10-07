import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import Tenant from './Tenant';
import TruckModel from './Model';

interface TruckAttributes {
    truckId: number;
    tenantId: number;
    modelId: number;
    year: number;
    plate: string;
    vin: string;
    status: boolean;
}

interface TruckCreationAttributes extends Optional<TruckAttributes, 'truckId'> {}

class Truck extends Model<TruckAttributes, TruckCreationAttributes> implements TruckAttributes {
    public truckId!: number;
    public tenantId!: number;
    public modelId!: number;
    public year!: number;
    public plate!: string;
    public vin!: string;
    public status!: boolean;
}

Truck.init({
    truckId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    tenantId: {
        type: DataTypes.INTEGER,
        references: { model: Tenant, key: 'tenantId' }
    },
    modelId: {
        type: DataTypes.INTEGER,
        references: { model: TruckModel, key: 'modelId' }
    },
    year: DataTypes.INTEGER,
    plate: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    vin: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    sequelize,
    modelName: 'Truck',
    tableName: 'truck',
    underscored: true,
    timestamps: false
});

Truck.belongsTo(Tenant, { as: 'tenant', foreignKey: 'tenantId' });
Truck.belongsTo(TruckModel, { as: 'model', foreignKey: 'modelId' });

export default Truck;
