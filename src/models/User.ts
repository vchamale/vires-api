import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '@config/database';
import Tenant from '@models/Tenant';
import Role from '@models/Role';
import Truck from '@models/Truck';

// Definimos los atributos de User
interface UserAttributes {
    user_id: number;
    tenant_id: number;
    role_id: number;
    truck_id?: number;
    email: string;
    password: string;
    names: string;
    last_names: string;
    telephone: string;
    license: string;
    status: boolean;
}

// Definimos los atributos opcionales para la creación de un User
interface UserCreationAttributes extends Optional<UserAttributes, 'user_id'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public user_id!: number;
    public tenant_id!: number;
    public role_id!: number;
    public truck_id?: number;
    public email!: string;
    public password!: string;
    public names!: string;
    public last_names!: string;
    public telephone!: string;
    public license!: string;
    public status!: boolean;
}

// Inicializamos el modelo User
User.init({
    user_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    tenant_id: {
        type: DataTypes.INTEGER,
        references: { model: Tenant, key: 'tenant_id' }
    },
    role_id: {
        type: DataTypes.INTEGER,
        references: { model: Role, key: 'role_id' }
    },
    truck_id: {
        type: DataTypes.INTEGER,
        references: { model: Truck, key: 'truck_id' },
        allowNull: true
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    names: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    last_names: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    telephone: DataTypes.STRING(15),
    license: DataTypes.STRING(20),
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    sequelize,
    modelName: 'User',
    tableName: 'user',
    timestamps: false
});

User.belongsTo(Tenant, { foreignKey: 'tenant_id' });
User.belongsTo(Role, { foreignKey: 'role_id' });
User.belongsTo(Truck, { foreignKey: 'truck_id' });

export default User;
