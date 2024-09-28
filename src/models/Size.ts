import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '@config/database';

// Definimos los atributos de Size
interface SizeAttributes {
    size_id: number;
    description: string;
    feet: number;
}

// Definimos los atributos opcionales para la creación de un Size
interface SizeCreationAttributes extends Optional<SizeAttributes, 'size_id'> {}

class Size extends Model<SizeAttributes, SizeCreationAttributes> implements SizeAttributes {
    public size_id!: number;
    public description!: string;
    public feet!: number;
}

// Inicializamos el modelo Size
Size.init({
    size_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    description: {
        type: DataTypes.STRING(25),
        allowNull: false
    },
    feet: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Size',
    tableName: 'size',
    timestamps: false
});

export default Size;
