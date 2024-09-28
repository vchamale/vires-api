import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '@config/database';
import Tenant from '@models/Tenant';

// Definimos los atributos de Client
interface ClientAttributes {
    client_id: number;
    tenant_id: number;
    nit: string;
    name: string;
    address: string;
    contact_name: string;
    telephone: string;
    email: string;
    status: boolean;
}

// Definimos los atributos opcionales para la creación de un Client
interface ClientCreationAttributes extends Optional<ClientAttributes, 'client_id'> {}

class Client extends Model<ClientAttributes, ClientCreationAttributes> implements ClientAttributes {
    public client_id!: number;
    public tenant_id!: number;
    public nit!: string;
    public name!: string;
    public address!: string;
    public contact_name!: string;
    public telephone!: string;
    public email!: string;
    public status!: boolean;
}

// Inicializamos el modelo Client
Client.init({
    client_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    tenant_id: {
        type: DataTypes.INTEGER,
        references: { model: Tenant, key: 'tenant_id' }
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
    contact_name: {
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
    timestamps: false
});

Client.belongsTo(Tenant, { foreignKey: 'tenant_id' });

export default Client;
