import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { sequelize } from "./config/database";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./config/swagger";
import { createLogger } from "./config/logger";
import { loggerMiddleware, errorLoggerMiddleware } from "./middlewares/logger";

const log = createLogger("server");

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
import sizesRoutes from "./routes/sizeRoutes";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

// HTTP access logging (registra cada request al finalizar).
app.use(loggerMiddleware);

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
app.use("/api/sizes", sizesRoutes);

// Manejador centralizado de errores (debe ir después de todas las rutas).
app.use(errorLoggerMiddleware);

// Server initialization
// La DB ya viene migrada completa desde Supabase (tablas, funciones, triggers).
// Solo verificamos la conexión; no usamos sync() para no divergir del schema real.
sequelize.authenticate().then(() => {
  log.info("Successful database connection.", { context: "bootstrap" });
  const server = app.listen(PORT, () => {
    log.info(`Server running on http://localhost:${PORT}`, {
      context: "bootstrap",
      port: PORT,
    });
  });

  // Cierre limpio: libera el puerto y cierra la conexión a la DB
  // antes de que el proceso termine (evita procesos zombie con nodemon).
  const shutdown = (signal: string) => {
    log.warn(`${signal} received. Shutting down gracefully...`, {
      context: "shutdown",
      signal,
    });
    server.close(() => {
      sequelize.close().finally(() => {
        log.info("Server and database connections closed.", {
          context: "shutdown",
        });
        process.exit(0);
      });
    });
  };

  process.on("SIGINT", () => shutdown("SIGINT"));
  process.on("SIGTERM", () => shutdown("SIGTERM"));
}).catch((error) => {
  log.error("Unable to connect to the database", {
    context: "bootstrap",
    error,
  });
});

// test ssh
