import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'Book Tracker API',
    description: 'API for managing reading lists, books, and reviews.',
    version: '1.0.0',
  },
  host: 'localhost:3000',
  basePath: '/api/v1',
  schemes: ['http'],
  securityDefinitions: {
    bearerAuth: {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    },
  },
};

const outputFile = './src/docs/swagger-output.json'; // ✅ File is here
const endpointsFiles = ['./src/app.ts']; // ✅ or routes directly

swaggerAutogen()(outputFile, endpointsFiles, doc);
