import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import Client from './Client';

interface DestinationAttributes {
    destination_id: number;
    client_id: number;
    name: string;
    address: string;
}

interface DestinationCreationAttributes extends Optional<DestinationAttributes, 'destination_id'> {}

class Destination extends Model<DestinationAttributes, DestinationCreationAttributes> implements DestinationAttributes {
    public destination_id!: number;
    public client_id!: number;
    public name!: string;
    public address!: string;
}

Destination.init({
    destination_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    client_id: {
        type: DataTypes.INTEGER,
        references: { model: Client, key: 'client_id' }
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
    timestamps: false
});

Destination.belongsTo(Client, { foreignKey: 'client_id' });

export default Destination;
