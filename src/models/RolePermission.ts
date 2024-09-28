import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import Role from './Role';
import Permission from './Permission';

class RolePermission extends Model {
    public role_id!: number;
    public permission_id!: number;
}

RolePermission.init({
    role_id: {
        type: DataTypes.INTEGER,
        references: { model: Role, key: 'role_id' },
        primaryKey: true
    },
    permission_id: {
        type: DataTypes.INTEGER,
        references: { model: Permission, key: 'permission_id' },
        primaryKey: true
    }
}, {
    sequelize,
    modelName: 'RolePermission',
    tableName: 'role_permission',
    timestamps: false
});

Role.belongsToMany(Permission, { through: RolePermission, foreignKey: 'role_id' });
Permission.belongsToMany(Role, { through: RolePermission, foreignKey: 'permission_id' });

export default RolePermission;
