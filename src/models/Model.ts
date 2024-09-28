import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '@config/database';
import Make from '@models/Make';

// Definimos los atributos de Model
interface ModelAttributes {
    model_id: number;
    make_id: number;
    name: string;
}

// Definimos los atributos opcionales para la creación de un Model
interface ModelCreationAttributes extends Optional<ModelAttributes, 'model_id'> {}

class TruckModel extends Model<ModelAttributes, ModelCreationAttributes> implements ModelAttributes {
    public model_id!: number;
    public make_id!: number;
    public name!: string;
}

// Inicializamos el modelo Model
TruckModel.init({
    model_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    make_id: {
        type: DataTypes.INTEGER,
        references: { model: Make, key: 'make_id' }
    },
    name: {
        type: DataTypes.STRING(25),
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Model',
    tableName: 'model',
    timestamps: false
});

TruckModel.belongsTo(Make, { foreignKey: 'make_id' });

export default TruckModel;
