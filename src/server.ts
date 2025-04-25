
// server.ts (place this inside src/ if following original structure)
import express from 'express';
import swaggerUi from 'swagger-ui-express';
// @ts-ignore
const swaggerFile = require('./docs/swagger-output.json');
import app from '../src/app';

const server = express();

server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
server.use(app);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(` Server running at http://localhost:${PORT}`)});
