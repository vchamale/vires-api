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
    shipmentId: number;
    tenantId: number;
    shipmentStatusId: number;
    originId: number;
    destinationId: number;
    containerId: number;
    documentId: number;
    driverId: number;
    truckId: number;
    statusUpdated: Date;
    price: number;
    weight: number;
    notes?: string;
}

interface ShipmentCreationAttributes extends Optional<ShipmentAttributes, 'shipmentId'> {}

class Shipment extends Model<ShipmentAttributes, ShipmentCreationAttributes> implements ShipmentAttributes {
    public shipmentId!: number;
    public tenantId!: number;
    public shipmentStatusId!: number;
    public originId!: number;
    public destinationId!: number;
    public containerId!: number;
    public documentId!: number;
    public driverId!: number;
    public truckId!: number;
    public statusUpdated!: Date;
    public price!: number;
    public weight!: number;
    public notes?: string;
}

Shipment.init({
    shipmentId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    tenantId: {
        type: DataTypes.INTEGER,
        references: { model: Tenant, key: 'tenantId' }
    },
    shipmentStatusId: {
        type: DataTypes.INTEGER,
        references: { model: ShipmentStatus, key: 'shipmentStatusId' }
    },
    originId: {
        type: DataTypes.INTEGER,
        references: { model: Origin, key: 'originId' }
    },
    destinationId: {
        type: DataTypes.INTEGER,
        references: { model: Destination, key: 'destinationId' }
    },
    containerId: {
        type: DataTypes.INTEGER,
        references: { model: Container, key: 'containerId' }
    },
    documentId: {
        type: DataTypes.INTEGER,
        references: { model: Document, key: 'documentId' }
    },
    driverId: {
        type: DataTypes.INTEGER,
        references: { model: User, key: 'userId' }
    },
    truckId: {
        type: DataTypes.INTEGER,
        references: { model: Truck, key: 'truckId' }
    },
    statusUpdated: {
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
    underscored: true,
    timestamps: false
});

Shipment.belongsTo(Tenant, { as: 'tenant', foreignKey: 'tenantId' });
Shipment.belongsTo(ShipmentStatus, { as: 'shipmentStatus', foreignKey: 'shipmentStatusId' });
Shipment.belongsTo(Origin, { as: 'origin', foreignKey: 'originId' });
Shipment.belongsTo(Destination, { as: 'destination', foreignKey: 'destinationId' });
Shipment.belongsTo(Container, { as: 'container', foreignKey: 'containerId' });
Shipment.belongsTo(Document, { as: 'document', foreignKey: 'documentId' });
Shipment.belongsTo(User, { as: 'user', foreignKey: 'driverId' });
Shipment.belongsTo(Truck, { as: 'truck', foreignKey: 'truckId' });

export default Shipment;
