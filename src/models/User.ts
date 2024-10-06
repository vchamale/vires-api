import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import Tenant from './Tenant';
import Role from './Role';
import Truck from './Truck';

interface UserAttributes {
    userId: number;
    tenantId: number;
    roleId: number;
    truckId?: number;
    email: string;
    password?: string;
    names: string;
    lastNames: string;
    telephone: string;
    license: string;
    status: boolean;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'userId'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public userId!: number;
    public tenantId!: number;
    public roleId!: number;
    public truckId?: number;
    public email!: string;
    public password?: string;
    public names!: string;
    public lastNames!: string;
    public telephone!: string;
    public license!: string;
    public status!: boolean;

    toJSON() {
        const values = Object.assign({}, this.get());
        console.log('values ', values)
        delete values.password;
        return values;
      }
}

User.init({
    userId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    tenantId: {
        type: DataTypes.INTEGER,
        references: { model: Tenant, key: 'tenantId' }
    },
    roleId: {
        type: DataTypes.INTEGER,
        references: { model: Role, key: 'roleId' }
    },
    truckId: {
        type: DataTypes.INTEGER,
        references: { model: Truck, key: 'truckId' },
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
    lastNames: {
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
    tableName: 'app_user',
    underscored: true,
    timestamps: false
});

User.belongsTo(Tenant, { as: 'tenant', foreignKey: 'tenantId' });
User.belongsTo(Role, { as: 'role', foreignKey: 'roleId' });
User.belongsTo(Truck, { as: 'truck',foreignKey: 'truckId' });

export default User;
