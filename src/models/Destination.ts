import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import Client from './Client';

interface DestinationAttributes {
    destinationId: number;
    clientId: number;
    name: string;
    address: string;
}

interface DestinationCreationAttributes extends Optional<DestinationAttributes, 'destinationId'> {}

class Destination extends Model<DestinationAttributes, DestinationCreationAttributes> implements DestinationAttributes {
    public destinationId!: number;
    public clientId!: number;
    public name!: string;
    public address!: string;
}

Destination.init({
    destinationId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    clientId: {
        type: DataTypes.INTEGER,
        references: { model: Client, key: 'clientId' }
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
    modelName: 'Destination',
    tableName: 'destination',
    underscored: true,
    timestamps: false
});

Destination.belongsTo(Client, { as: 'client', foreignKey: 'clientId' });

export default Destination;
