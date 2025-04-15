import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from './docs/swagger-output.json'; // Make sure this path is correct
import app from '../app';

const server = express();

// Swagger route
server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// Mount app
server.use(app);

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(` Server is running at http://localhost:${PORT}`);
});
