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
import Client from "@models/Client";

class ShipmentService {

  async create(shipmentData: any) {
    const {
      tenantId,
      clientId,
      originId,
      destinationId,
      container: containerNumber,
      driverId,
      truckId,
      sizeId: containerSizeId,
      price,
      weight,
      documentNumber = null,
      notes = null,
      currencyId = 1,
      atc = null,
    } = shipmentData;

    const result = await sequelize.query(
      `SELECT create_new_shipment(
        :tenantId,
        :clientId,
        :originId,
        :destinationId,
        :containerNumber,
        :containerSizeId,
        :driverId,
        :truckId,
        :price,
        :weight,
        :documentNumber,
        :notes,
        :currencyId,
        :atc

      ) `,
      {
        replacements: {
          tenantId,
          clientId,
          originId,
          destinationId,
          containerNumber,
          containerSizeId,
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

    const { weight, price, containerNumber, shipmentStatus: shipmentStatusId,
      origin: originId, destination: destinationId, truck: truckId, driver: driverId, ...rest
     } = updateData

    return await shipment.update({
      weight, price, containerNumber, shipmentStatusId, driverId, originId, destinationId, truckId, ...rest
    });
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
        { model: Truck, as: "truck" },
        { model: Client, as: "client", attributes: ["name"] },
        { model: User, as: "driver", attributes: ["names", "last_names"] },
      ],
    });
  }
}

export default new ShipmentService();
