import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import Tenant from './Tenant';

interface ClientAttributes {
    clientId: number;
    tenantId: number;
    nit: string;
    name: string;
    address: string;
    contactName: string;
    telephone: string;
    email: string;
    status: boolean;
}

interface ClientCreationAttributes extends Optional<ClientAttributes, 'clientId'> {}

class Client extends Model<ClientAttributes, ClientCreationAttributes> implements ClientAttributes {
    public clientId!: number;
    public tenantId!: number;
    public nit!: string;
    public name!: string;
    public address!: string;
    public contactName!: string;
    public telephone!: string;
    public email!: string;
    public status!: boolean;
}

Client.init({
    clientId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    tenantId: {
        type: DataTypes.INTEGER,
        references: { model: Tenant, key: 'tenantId' }
    },
    nit: {
        type: DataTypes.STRING(15),
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    address: DataTypes.STRING(255),
    contactName: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    telephone: {
        type: DataTypes.STRING(15),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    sequelize,
    modelName: 'Client',
    tableName: 'client',
    underscored: true,
    timestamps: false
});

Client.belongsTo(Tenant, { as: 'tenant', foreignKey: 'tenantId' });

export default Client;
