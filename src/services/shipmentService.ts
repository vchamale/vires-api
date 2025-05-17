import User from "../models/User";
import Shipment from "../models/Shipment";
import Tenant from "../models/Tenant";
import ShipmentStatus from "../models/ShipmentStatus";
import Origin from "../models/Origin";
import Destination from "../models/Destination";
import Container from "../models/Container";
import Truck from "../models/Truck";
import Document from "../models/Document";
import { sequelize, QueryTypes } from "../config/database";

class ShipmentService {
  // async create(shipmentData: any) {
  //   const newShipment = await Shipment.create(shipmentData);
  //   return newShipment;
  // }

  async create(shipmentData: any) {
    const {
      tenantId,
      originId,
      destinationId,
      containerId,
      driverId,
      truckId,
      price,
      weight,
      documentNumber = null,
      notes = null,
      currencyId = 1,
      atc = null,
    } = shipmentData;

    console.log(">>>>> this is shipmentdata", shipmentData);

    const result = await sequelize.query(
      `SELECT create_new_shipment(
        :tenantId, :originId, :destinationId, :containerId,
        :driverId, :truckId, :price, :weight,
        :documentNumber, :notes, :currencyId, :atcr
      ) `,
      {
        replacements: {
          tenantId,
          originId,
          destinationId,
          containerId: "TestContainer02",
          driverId,
          truckId,
          price,
          weight,
          documentNumber,
          notes,
          currencyId,
          atc,
        },
        type: QueryTypes.SELECT,
      }
    );

    // El resultado es un array con un objeto: [{ shipment_id: 123 }]
    return result[0];
  }

  async getById(shipmentId: number, tenantId: number) {
    return await Shipment.findOne({
      where: {
        shipmentId,
        tenantId,
      },
      include: [
        { model: Tenant, as: "tenant" },
        { model: ShipmentStatus, as: "shipmentStatus" },
        { model: Origin, as: "origin" },
        { model: Destination, as: "destination" },
        { model: Container, as: "container" },
        { model: Document, as: "document" },
        {
          model: User,
          as: "user",
          attributes: { exclude: ["password"] },
        },
        { model: Truck, as: "truck" },
      ],
      attributes: { exclude: ["password"] },
    });
  }

  async update(shipmentId: number, updateData: any) {
    const shipment = await Shipment.findByPk(shipmentId);
    if (!shipment) {
      return null;
    }
    return await shipment.update(updateData);
  }

  async delete(shipmentId: number, tenantId: number) {
    const deletedRows = await Shipment.destroy({
      where: { shipmentId, tenantId },
    });
    return deletedRows > 0;
  }

  async getAll(filters: any = {}) {
    return await Shipment.findAll({
      where: filters,
      include: [
        { model: Tenant, as: "tenant" },
        { model: ShipmentStatus, as: "shipmentStatus" },
        { model: Origin, as: "origin" },
        { model: Destination, as: "destination" },
        { model: Container, as: "container" },
        { model: Document, as: "document" },
        {
          model: User,
          as: "user",
          attributes: { exclude: ["password"] },
        },
        { model: Truck, as: "truck" },
      ],
    });
  }
}

export default new ShipmentService();
