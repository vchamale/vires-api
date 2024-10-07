import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import Role from './Role';
import Permission from './Permission';

class RolePermission extends Model {
    public roleId!: number;
    public permissionId!: number;
}

RolePermission.init({
    roleId: {
        type: DataTypes.INTEGER,
        references: { model: Role, key: 'roleId' },
        primaryKey: true
    },
    permissionId: {
        type: DataTypes.INTEGER,
        references: { model: Permission, key: 'permissionId' },
        primaryKey: true
    }
}, {
    sequelize,
    modelName: 'RolePermission',
    tableName: 'role_permission',
    underscored: true,
    timestamps: false
});

Role.belongsToMany(Permission, { as: 'role', through: RolePermission, foreignKey: 'roleId' });
Permission.belongsToMany(Role, { as: 'permission', through: RolePermission, foreignKey: 'permissionId' });

export default RolePermission;
