import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface CurrencyAttributes {
    currencyId: number;
    name: string;
    simbol: string;
}

interface CurrencyCreationAttributes extends Optional<CurrencyAttributes, 'currencyId'> {}

class Currency extends Model<CurrencyAttributes, CurrencyCreationAttributes> implements CurrencyAttributes {
    public currencyId!: number;
    public name!: string;
    public simbol!: string;
}

Currency.init({
    currencyId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: 'currency_id'
    },
    name: {
        type: DataTypes.STRING(25),
        allowNull: true,
    },
    simbol: {
        type: DataTypes.STRING(2),
        allowNull: true,
    }
}, {
    sequelize,
    modelName: 'Currency',
    tableName: 'currency',
    underscored: true,
    timestamps: false,
});

export default Currency;
