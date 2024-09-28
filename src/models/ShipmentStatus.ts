import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface ShipmentStatusAttributes {
    shipment_status_id: number;
    description: string;
}

interface ShipmentStatusCreationAttributes extends Optional<ShipmentStatusAttributes, 'shipment_status_id'> {}

class ShipmentStatus extends Model<ShipmentStatusAttributes, ShipmentStatusCreationAttributes> implements ShipmentStatusAttributes {
    public shipment_status_id!: number;
    public description!: string;
}

ShipmentStatus.init({
    shipment_status_id: {
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
    modelName: 'ShipmentStatus',
    tableName: 'shipment_status',
    timestamps: false
});

export default ShipmentStatus;
