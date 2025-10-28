import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";
import Client from "./Client";

interface DocumentAttributes {
  documentId: number;
  clientId: number;
  documentNumber: string;
}

interface DocumentCreationAttributes
  extends Optional<
    DocumentAttributes,
    "documentId" | "clientId" | "documentNumber"
  > {}

class Document
  extends Model<DocumentAttributes, DocumentCreationAttributes>
  implements DocumentAttributes
{
  public documentId!: number;
  public clientId!: number;
  public documentNumber!: string;
}

Document.init(
  {
    documentId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Client,
        key: "clientId",
      },
    },
    documentNumber: {
      type: DataTypes.STRING(25),
      allowNull: false,
    }
  },
  {
    sequelize,
    modelName: "Document",
    tableName: "document",
    underscored: true,
    timestamps: true,
  }
);

Document.belongsTo(Client, { as: "client", foreignKey: "clientId" });

export default Document;
