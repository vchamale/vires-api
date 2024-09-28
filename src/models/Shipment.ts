import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import Tenant from './Tenant';
import ShipmentStatus from './ShipmentStatus';
import Origin from './Origin';
import Destination from './Destination';
import Container from './Container';
import Document from './Document';
import User from './User';
import Truck from './Truck';

interface ShipmentAttributes {
    shipment_id: number;
    tenant_id: number;
    shipment_status_id: number;
    origin_id: number;
    destination_id: number;
    container_id: number;
    document_id: number;
    driver_id: number;
    truck_id: number;
    status_updated: Date;
    price: number;
    weight: number;
    notes?: string;
}

interface ShipmentCreationAttributes extends Optional<ShipmentAttributes, 'shipment_id'> {}

class Shipment extends Model<ShipmentAttributes, ShipmentCreationAttributes> implements ShipmentAttributes {
    public shipment_id!: number;
    public tenant_id!: number;
    public shipment_status_id!: number;
    public origin_id!: number;
    public destination_id!: number;
    public container_id!: number;
    public document_id!: number;
    public driver_id!: number;
    public truck_id!: number;
    public status_updated!: Date;
    public price!: number;
    public weight!: number;
    public notes?: string;
}

Shipment.init({
    shipment_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    tenant_id: {
        type: DataTypes.INTEGER,
        references: { model: Tenant, key: 'tenant_id' }
    },
    shipment_status_id: {
        type: DataTypes.INTEGER,
        references: { model: ShipmentStatus, key: 'shipment_status_id' }
    },
    origin_id: {
        type: DataTypes.INTEGER,
        references: { model: Origin, key: 'origin_id' }
    },
    destination_id: {
        type: DataTypes.INTEGER,
        references: { model: Destination, key: 'destination_id' }
    },
    container_id: {
        type: DataTypes.INTEGER,
        references: { model: Container, key: 'container_id' }
    },
    document_id: {
        type: DataTypes.INTEGER,
        references: { model: Document, key: 'document_id' }
    },
    driver_id: {
        type: DataTypes.INTEGER,
        references: { model: User, key: 'user_id' }
    },
    truck_id: {
        type: DataTypes.INTEGER,
        references: { model: Truck, key: 'truck_id' }
    },
    status_updated: {
        type: DataTypes.DATE,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    weight: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    notes: DataTypes.TEXT
}, {
    sequelize,
    modelName: 'Shipment',
    tableName: 'shipment',
    timestamps: false
});

Shipment.belongsTo(Tenant, { foreignKey: 'tenant_id' });
Shipment.belongsTo(ShipmentStatus, { foreignKey: 'shipment_status_id' });
Shipment.belongsTo(Origin, { foreignKey: 'origin_id' });
Shipment.belongsTo(Destination, { foreignKey: 'destination_id' });
Shipment.belongsTo(Container, { foreignKey: 'container_id' });
Shipment.belongsTo(Document, { foreignKey: 'document_id' });
Shipment.belongsTo(User, { foreignKey: 'driver_id' });
Shipment.belongsTo(Truck, { foreignKey: 'truck_id' });

export default Shipment;
