import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";
import Client from "./Client";

interface OriginAttributes {
  originId: number;
  clientId: number;
  name: string;
  address: string;
}

interface OriginCreationAttributes
  extends Optional<OriginAttributes, "originId"> {}

class Origin
  extends Model<OriginAttributes, OriginCreationAttributes>
  implements OriginAttributes
{
  public originId!: number;
  public clientId!: number;
  public name!: string;
  public address!: string;
}

Origin.init(
  {
    originId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: Client, key: "clientId" },
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Origin",
    tableName: "origin",
    underscored: true,
    timestamps: false,
  }
);

Origin.belongsTo(Client, { as: "client", foreignKey: "clientId" });
Client.hasMany(Origin, { as: "origins", foreignKey: "clientId" });

export default Origin;
