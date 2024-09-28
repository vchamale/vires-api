import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import Tenant from './Tenant';
import Size from './Size';

interface ContainerAttributes {
    container_id: number;
    tenant_id: number;
    size_id: number;
    container_number: string;
}

interface ContainerCreationAttributes extends Optional<ContainerAttributes, 'container_id'> {}

class Container extends Model<ContainerAttributes, ContainerCreationAttributes> implements ContainerAttributes {
    public container_id!: number;
    public tenant_id!: number;
    public size_id!: number;
    public container_number!: string;
}

Container.init({
    container_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    tenant_id: {
        type: DataTypes.INTEGER,
        references: { model: Tenant, key: 'tenant_id' }
    },
    size_id: {
        type: DataTypes.INTEGER,
        references: { model: Size, key: 'size_id' }
    },
    container_number: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Container',
    tableName: 'container',
    timestamps: false
});

Container.belongsTo(Tenant, { foreignKey: 'tenant_id' });
Container.belongsTo(Size, { foreignKey: 'size_id' });

export default Container;
