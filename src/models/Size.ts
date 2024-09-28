import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface SizeAttributes {
    size_id: number;
    description: string;
    feet: number;
}

interface SizeCreationAttributes extends Optional<SizeAttributes, 'size_id'> {}

class Size extends Model<SizeAttributes, SizeCreationAttributes> implements SizeAttributes {
    public size_id!: number;
    public description!: string;
    public feet!: number;
}

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
