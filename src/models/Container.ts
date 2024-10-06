import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import Tenant from './Tenant';
import Size from './Size';

interface ContainerAttributes {
    containerId: number;
    tenantId: number;
    sizeId: number;
    containerNumber: string;
}

interface ContainerCreationAttributes extends Optional<ContainerAttributes, 'containerId'> {}

class Container extends Model<ContainerAttributes, ContainerCreationAttributes> implements ContainerAttributes {
    public containerId!: number;
    public tenantId!: number;
    public sizeId!: number;
    public containerNumber!: string;
}

Container.init({
    containerId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    tenantId: {
        type: DataTypes.INTEGER,
        references: { model: Tenant, key: 'tenantId' }
    },
    sizeId: {
        type: DataTypes.INTEGER,
        references: { model: Size, key: 'sizeId' }
    },
    containerNumber: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Container',
    tableName: 'container',
    underscored: true,
    timestamps: false
});

Container.belongsTo(Tenant, { as: 'tenant', foreignKey: 'tenantId' });
Container.belongsTo(Size, { as: 'size', foreignKey: 'sizeId' });

export default Container;
