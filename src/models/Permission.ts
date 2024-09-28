import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '@config/database';

// Definimos los atributos de Permission
interface PermissionAttributes {
    permission_id: number;
    description: string;
}

// Definimos los atributos opcionales para la creación de un Permission
interface PermissionCreationAttributes extends Optional<PermissionAttributes, 'permission_id'> {}

class Permission extends Model<PermissionAttributes, PermissionCreationAttributes> implements PermissionAttributes {
    public permission_id!: number;
    public description!: string;
}

// Inicializamos el modelo Permission
Permission.init({
    permission_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    description: DataTypes.STRING(100)
}, {
    sequelize,
    modelName: 'Permission',
    tableName: 'permission',
    timestamps: false
});

export default Permission;
