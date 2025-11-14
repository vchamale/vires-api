// import { DataTypes, Model, Optional } from "sequelize";
// import { sequelize } from "../config/database";
// import Tenant from "./Tenant";
// import ShipmentStatus from "./ShipmentStatus";
// import Origin from "./Origin";
// import Destination from "./Destination";
// import Container from "./Container";
// import Document from "./Document";
// import User from "./User";
// import Truck from "./Truck";

// interface ShipmentAttributes {
//   shipmentId: number;
//   tenantId: number;
//   shipmentStatusId: number;
//   originId: number;
//   destinationId: number;
//   containerId: number;
//   documentId: number;
//   driverId: number;
//   truckId: number;
//   dateCreated: Date;
//   price: number;
//   weight: number;
//   notes?: string;
// }

// interface ShipmentCreationAttributes
//   extends Optional<ShipmentAttributes, "shipmentId"> {}

// class Shipment
//   extends Model<ShipmentAttributes, ShipmentCreationAttributes>
//   implements ShipmentAttributes
// {
//   public shipmentId!: number;
//   public tenantId!: number;
//   public shipmentStatusId!: number;
//   public originId!: number;
//   public destinationId!: number;
//   public containerId!: number;
//   public documentId!: number;
//   public driverId!: number;
//   public truckId!: number;
//   public dateCreated!: Date;
//   public price!: number;
//   public weight!: number;
//   public notes?: string;
// }

// Shipment.init(
//   {
//     shipmentId: {
//       type: DataTypes.INTEGER,
//       autoIncrement: true,
//       primaryKey: true,
//     },
//     tenantId: {
//       type: DataTypes.INTEGER,
//       references: { model: Tenant, key: "tenantId" },
//     },
//     shipmentStatusId: {
//       type: DataTypes.INTEGER,
//       references: { model: ShipmentStatus, key: "shipmentStatusId" },
//     },
//     originId: {
//       type: DataTypes.INTEGER,
//       references: { model: Origin, key: "originId" },
//     },
//     destinationId: {
//       type: DataTypes.INTEGER,
//       references: { model: Destination, key: "destinationId" },
//     },
//     containerId: {
//       type: DataTypes.INTEGER,
//       references: { model: Container, key: "containerId" },
//     },
//     documentId: {
//       type: DataTypes.INTEGER,
//       references: { model: Document, key: "documentId" },
//     },
//     driverId: {
//       type: DataTypes.INTEGER,
//       references: { model: User, key: "userId" },
//     },
//     truckId: {
//       type: DataTypes.INTEGER,
//       references: { model: Truck, key: "truckId" },
//     },
//     dateCreated: {
//       type: DataTypes.DATE,
//       allowNull: false,
//     },
//     price: {
//       type: DataTypes.DECIMAL(10, 2),
//       allowNull: false,
//     },
//     weight: {
//       type: DataTypes.DECIMAL(10, 2),
//       allowNull: false,
//     },
//     notes: DataTypes.TEXT,
//   },
//   {
//     sequelize,
//     modelName: "Shipment",
//     tableName: "shipment",
//     underscored: true,
//     timestamps: false,
//   }
// );

// Shipment.belongsTo(Tenant, { as: "tenant", foreignKey: "tenantId" });
// Shipment.belongsTo(ShipmentStatus, {
//   as: "shipmentStatus",
//   foreignKey: "shipmentStatusId",
// });
// Shipment.belongsTo(Origin, { as: "origin", foreignKey: "originId" });
// Shipment.belongsTo(Destination, {
//   as: "destination",
//   foreignKey: "destinationId",
// });
// Shipment.belongsTo(Container, { as: "container", foreignKey: "containerId" });
// Shipment.belongsTo(Document, { as: "document", foreignKey: "documentId" });
// Shipment.belongsTo(User, { as: "user", foreignKey: "driverId" });
// Shipment.belongsTo(Truck, { as: "truck", foreignKey: "truckId" });

// export default Shipment;





import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";
import Tenant from "./Tenant";
import ShipmentStatus from "./ShipmentStatus";
import Origin from "./Origin";
import Destination from "./Destination";
import Container from "./Container";
import Document from "./Document";
import User from "./User"; // debe mapear a tabla app_user
import Truck from "./Truck";
import Client from "./Client";
import Currency from "./Currency";

interface ShipmentAttributes {
  shipmentId: number;
  tenantId: number;
  originId?: number | null;
  destinationId?: number | null;
  containerId: number;
  documentId?: number | null;
  driverId: number;
  truckId: number;
  dateCreated: Date;                  // NOT NULL
  price?: string | number | null;     // numeric(10,2) puede venir como string
  weight?: string | number | null;    // numeric(10,2) puede venir como string
  notes?: string | null;
  currencyId?: number | null;
  atc?: string | null;
  clientId: number;
  shipmentStatusId: number;
}

interface ShipmentCreationAttributes
  extends Optional<
    ShipmentAttributes,
    | "shipmentId"
    | "originId"
    | "destinationId"
    | "documentId"
    | "price"
    | "weight"
    | "notes"
    | "currencyId"
    | "atc"
  > {}

class Shipment
  extends Model<ShipmentAttributes, ShipmentCreationAttributes>
  implements ShipmentAttributes
{
  public shipmentId!: number;
  public tenantId!: number;
  public originId!: number | null;
  public destinationId!: number | null;
  public containerId!: number;
  public documentId!: number | null;
  public driverId!: number;
  public truckId!: number;
  public dateCreated!: Date;
  public price!: string | number | null;
  public weight!: string | number | null;
  public notes!: string | null;
  public currencyId!: number | null;
  public atc!: string | null;
  public clientId!: number;
  public shipmentStatusId!: number;
}

Shipment.init(
  {
    shipmentId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      field: "shipment_id",
    },
    tenantId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "tenant_id",
      references: { model: Tenant, key: "tenantId" },
    },
    originId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "origin_id",
      references: { model: Origin, key: "originId" },
    },
    destinationId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "destination_id",
      references: { model: Destination, key: "destinationId" },
    },
    containerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "container_id",
      references: { model: Container, key: "containerId" },
    },
    documentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "document_id",
      references: { model: Document, key: "documentId" },
    },
    driverId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "driver_id",
      references: { model: User, key: "userId" }, // app_user.user_id
    },
    truckId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "truck_id",
      references: { model: Truck, key: "truckId" },
    },
    dateCreated: {
      type: DataTypes.DATE, // timestamptz en PG
      allowNull: false,
      field: "date_created",
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      field: "price",
    },
    weight: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      field: "weight",
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: "notes",
    },
    currencyId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "currency_id",
      references: { model: Currency, key: "currencyId" },
    },
    atc: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: "atc",
    },
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "client_id",
      references: { model: Client, key: "clientId" },
    },
    shipmentStatusId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "shipment_status_id",
      references: { model: ShipmentStatus, key: "shipmentStatusId" },
    },
  },
  {
    sequelize,
    modelName: "Shipment",
    tableName: "shipment",
    schema: "public",
    underscored: true,
    timestamps: false,
  }
);

// Asociaciones
Shipment.belongsTo(Tenant,          { as: "tenant",          foreignKey: "tenantId" });
Shipment.belongsTo(ShipmentStatus, { as: "shipmentStatus",  foreignKey: "shipmentStatusId" });
Shipment.belongsTo(Origin,         { as: "origin",          foreignKey: "originId" });
Shipment.belongsTo(Destination,    { as: "destination",     foreignKey: "destinationId" });
Shipment.belongsTo(Container,      { as: "container",       foreignKey: "containerId" });
Shipment.belongsTo(Document,       { as: "document",        foreignKey: "documentId" });
Shipment.belongsTo(User,           { as: "user",            foreignKey: "driverId" });
Shipment.belongsTo(Truck,          { as: "truck",           foreignKey: "truckId" });
Shipment.belongsTo(Client,         { as: "client",          foreignKey: "clientId" });
Shipment.belongsTo(Currency,       { as: "currency",        foreignKey: "currencyId" });
Shipment.belongsTo(User, { as: "driver", foreignKey: "driverId" });


export default Shipment;