import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import Tenant from './Tenant';
import TruckModel from './Model';

interface TruckAttributes {
    truck_id: number;
    tenant_id: number;
    model_id: number;
    year: number;
    plate: string;
    vin: string;
    status: boolean;
}

interface TruckCreationAttributes extends Optional<TruckAttributes, 'truck_id'> {}

class Truck extends Model<TruckAttributes, TruckCreationAttributes> implements TruckAttributes {
    public truck_id!: number;
    public tenant_id!: number;
    public model_id!: number;
    public year!: number;
    public plate!: string;
    public vin!: string;
    public status!: boolean;
}

Truck.init({
    truck_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    tenant_id: {
        type: DataTypes.INTEGER,
        references: { model: Tenant, key: 'tenant_id' }
    },
    model_id: {
        type: DataTypes.INTEGER,
        references: { model: TruckModel, key: 'model_id' }
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
    timestamps: false
});

Truck.belongsTo(Tenant, { foreignKey: 'tenant_id' });
Truck.belongsTo(TruckModel, { foreignKey: 'model_id' });

export default Truck;
