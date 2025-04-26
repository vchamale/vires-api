import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { sequelize } from "./config/database";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./config/swagger";

// Routes
import healthRoutes from "./routes/healthRoutes";
import userRoutes from "./routes/userRoutes";
import roleRoutes from "./routes/roleRoutes";
import driverRoutes from "./routes/driverRoutes";
import clientRoutes from "./routes/clientRoutes";
import shipmentRoutes from "./routes/shipmentRoutes";
import shipmentStatusRoutes from "./routes/ShipmentStatusRoutes";
import documentRoutes from "./routes/documentRoutes";
import destinationRoutes from "./routes/destinationRoutes";
import originRoutes from "./routes/originRoutes";
import truckRoutes from "./routes/truckRoutes";
import makeRoutes from "./routes/makeRoutes";
import modelRoutes from "./routes/truckModelRoutes";
import currencyRoutes from "./routes/currencyRoutes";
import containerRoutes from "./routes/containerRoutes";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

app.use(
  cors({
    origin: true, // Permitir cualquier origen (puedes especificar el dominio en producción)
    credentials: true, // Permitir envío de cookies
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Métodos permitidos
    allowedHeaders: "Content-Type,Authorization", // Encabezados permitidos
  })
);

app.use(cookieParser());

// Swagger Configuration
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use("/api", healthRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/drivers", driverRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/shipments", shipmentRoutes);
app.use("/api/shipments-status", shipmentStatusRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/destinations", destinationRoutes);
app.use("/api/origins", originRoutes);
app.use("/api/trucks", truckRoutes);
app.use("/api/make", makeRoutes);
app.use("/api/model", modelRoutes);
app.use("/api/currencies", currencyRoutes);
app.use("/api/containers", containerRoutes);

// Server initialization
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});

// test ssh
