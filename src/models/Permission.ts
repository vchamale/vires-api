import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface PermissionAttributes {
    permissionId: number;
    description: string;
}

interface PermissionCreationAttributes extends Optional<PermissionAttributes, 'permissionId'> {}

class Permission extends Model<PermissionAttributes, PermissionCreationAttributes> implements PermissionAttributes {
    public permissionId!: number;
    public description!: string;
}

Permission.init({
    permissionId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    description: DataTypes.STRING(100)
}, {
    sequelize,
    modelName: 'Permission',
    tableName: 'permission',
    underscored: true,
    timestamps: false
});

export default Permission;
