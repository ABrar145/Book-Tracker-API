import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './docs/swagger';
import userRoutes from './api/v1/routes/user.routes';
import bookRoutes from './api/v1/routes/book.routes';
import reviewRoutes from './api/v1/routes/review.routes';
import authMiddleware from './api/v1/middleware/auth.middleware';

dotenv.config();

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(authMiddleware);
// Routes
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/books', bookRoutes);
app.use('/api/v1/reviews', reviewRoutes);

// Swagger Docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Health Check
app.get('/', (_req, res) => {
  res.send(' Book Tracker API is running');
});


export default app;
