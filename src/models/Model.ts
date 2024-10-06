import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import Make from './Make';

interface ModelAttributes {
    modelId: number;
    makeId: number;
    name: string;
}

interface ModelCreationAttributes extends Optional<ModelAttributes, 'modelId'> {}

class TruckModel extends Model<ModelAttributes, ModelCreationAttributes> implements ModelAttributes {
    public modelId!: number;
    public makeId!: number;
    public name!: string;
}

TruckModel.init({
    modelId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    makeId: {
        type: DataTypes.INTEGER,
        references: { model: Make, key: 'makeId' }
    },
    name: {
        type: DataTypes.STRING(25),
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Model',
    tableName: 'model',
    underscored: true,
    timestamps: false
});

TruckModel.belongsTo(Make, { as: 'make', foreignKey: 'makeId' });

export default TruckModel;
