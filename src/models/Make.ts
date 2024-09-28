import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface MakeAttributes {
    make_id: number;
    name: string;
}

interface MakeCreationAttributes extends Optional<MakeAttributes, 'make_id'> {}

class Make extends Model<MakeAttributes, MakeCreationAttributes> implements MakeAttributes {
    public make_id!: number;
    public name!: string;
}

Make.init({
    make_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(20),
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Make',
    tableName: 'make',
    timestamps: false
});

export default Make;

