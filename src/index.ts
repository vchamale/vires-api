import express, { Application } from 'express';
import dotenv from 'dotenv';
import sequelize from './config/database';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './config/swagger';

// Routes
import healthRoutes from './routes/healthRoutes';
import userRoutes from './routes/userRoutes';
import roleRoutes from './routes/roleRoutes';
import clientRoutes from './routes/clientRoutes';
import shipmentRoutes from './routes/shipmentRoutes';
import destinationRoutes from './routes/destinationRoutes';
import originRoutes from './routes/originRoutes';
import truckRoutes from './routes/truckRoutes';


dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Swagger Configuration
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use('/api', healthRoutes);
app.use('/api/auth', userRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/shipments', shipmentRoutes);
app.use('/api/destinations', destinationRoutes);
app.use('/api/origins', originRoutes);
app.use('/api/trucks', truckRoutes);

// Server initialization
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
  });
});