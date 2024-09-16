import express, { Application } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './config/swagger';
import healthRoutes from './routes/healthRoutes';

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Swagger Configuration
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use('/api', healthRoutes);

// Server initialization
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});