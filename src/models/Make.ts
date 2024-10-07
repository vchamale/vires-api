import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface MakeAttributes {
    makeId: number;
    name: string;
}

interface MakeCreationAttributes extends Optional<MakeAttributes, 'makeId'> {}

class Make extends Model<MakeAttributes, MakeCreationAttributes> implements MakeAttributes {
    public makeId!: number;
    public name!: string;
}

Make.init({
    makeId: {
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
    underscored: true,
    timestamps: false
});

export default Make;

