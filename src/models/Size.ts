import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface SizeAttributes {
    sizeId: number;
    description: string;
    feet: number;
}

interface SizeCreationAttributes extends Optional<SizeAttributes, 'sizeId'> {}

class Size extends Model<SizeAttributes, SizeCreationAttributes> implements SizeAttributes {
    public sizeId!: number;
    public description!: string;
    public feet!: number;
}

Size.init({
    sizeId: {
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
    underscored: true,
    timestamps: false
});

export default Size;
