import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface ShipmentStatusAttributes {
    shipmentStatusId: number;
    description: string;
}

interface ShipmentStatusCreationAttributes extends Optional<ShipmentStatusAttributes, 'shipmentStatusId'> {}

class ShipmentStatus extends Model<ShipmentStatusAttributes, ShipmentStatusCreationAttributes> implements ShipmentStatusAttributes {
    public shipmentStatusId!: number;
    public description!: string;
}

ShipmentStatus.init({
    shipmentStatusId: {
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
    underscored: true,
    timestamps: false
});

export default ShipmentStatus;
