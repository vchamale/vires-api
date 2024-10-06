import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface RoleAttributes {
    roleId: number;
    name: string;
}

interface RoleCreationAttributes extends Optional<RoleAttributes, 'roleId'> {}

class Role extends Model<RoleAttributes, RoleCreationAttributes> implements RoleAttributes {
    public roleId!: number;
    public name!: string;
}

Role.init({
    roleId: {
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
    underscored: true,
    timestamps: false
});

export default Role;
