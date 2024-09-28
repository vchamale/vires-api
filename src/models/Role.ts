import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '@config/database';

// Definimos los atributos del Role
interface RoleAttributes {
    role_id: number;
    name: string;
}

// Definimos los atributos opcionales para la creación de un Role
interface RoleCreationAttributes extends Optional<RoleAttributes, 'role_id'> {}

class Role extends Model<RoleAttributes, RoleCreationAttributes> implements RoleAttributes {
    public role_id!: number;
    public name!: string;
}

// Inicializamos el modelo Role
Role.init({
    role_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Role',
    tableName: 'role',
    timestamps: false
});

export default Role;
